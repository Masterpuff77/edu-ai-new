import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing environment variables for Supabase');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse webhook payload
    const payload = await req.json();
    console.log('Received Tavus webhook:', JSON.stringify(payload));

    // Validate webhook signature (in production, you should verify the signature)
    // const signature = req.headers.get('x-tavus-signature');
    // if (!verifySignature(payload, signature)) {
    //   throw new Error('Invalid webhook signature');
    // }

    // Process webhook based on event type
    switch (payload.event) {
      case 'conversation.created':
        await handleConversationCreated(supabase, payload);
        break;
      case 'message.created':
        await handleMessageCreated(supabase, payload);
        break;
      case 'video.created':
        await handleVideoCreated(supabase, payload);
        break;
      default:
        console.log(`Unhandled event type: ${payload.event}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error processing webhook' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

async function handleConversationCreated(supabase: any, payload: any) {
  try {
    const { data, error } = await supabase
      .from('tavus_conversations')
      .insert([
        {
          conversation_id: payload.data.id,
          user_id: payload.data.metadata?.user_id || null,
          status: 'created',
          metadata: payload.data.metadata || {}
        }
      ]);

    if (error) throw error;
    console.log('Conversation created in database:', data);
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}

async function handleMessageCreated(supabase: any, payload: any) {
  try {
    const { data, error } = await supabase
      .from('tavus_messages')
      .insert([
        {
          message_id: payload.data.id,
          conversation_id: payload.data.conversation_id,
          content: payload.data.content,
          role: payload.data.role,
          status: payload.data.status,
          metadata: payload.data.metadata || {}
        }
      ]);

    if (error) throw error;
    console.log('Message created in database:', data);
  } catch (error) {
    console.error('Error saving message:', error);
  }
}

async function handleVideoCreated(supabase: any, payload: any) {
  try {
    const { data, error } = await supabase
      .from('tavus_messages')
      .update({
        video_url: payload.data.video_url,
        transcript: payload.data.transcript,
        status: 'completed'
      })
      .eq('message_id', payload.data.message_id);

    if (error) throw error;
    console.log('Video URL updated in database:', data);
    
    // Notify user about new video if needed
    // This could be done through a notification system or real-time updates
  } catch (error) {
    console.error('Error updating video URL:', error);
  }
}

// In production, implement signature verification
// function verifySignature(payload: any, signature: string | null): boolean {
//   if (!signature) return false;
//   // Implement signature verification logic here
//   return true;
// }