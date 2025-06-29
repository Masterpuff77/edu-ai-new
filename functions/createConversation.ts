import { Handler } from "@netlify/functions";
import axios from "axios";

// Define response types
interface TavusConversationResponse {
  id: string;
  persona_id: string;
  replica_id: string;
  conversation_name: string;
  conversation_url: string;
  created_at: string;
  updated_at: string;
}

interface ErrorResponse {
  error: string;
  status: number;
}

// Handler for the serverless function
export const handler: Handler = async (event) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Get API key from environment variables
    const apiKey = process.env.TAVUS_API_KEY;
    if (!apiKey) {
      console.error("TAVUS_API_KEY is not set in environment variables");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "API key not configured",
        }),
      };
    }

    // Define the payload for creating a conversation
    const payload = {
      persona_id: "p7636ec0d04c",
      replica_id: "r95fd27b5a37",
      conversation_name: "Avatar Call",
      conversational_context: "Office-style CVI, avatar stays still in pauses.",
      properties: {
        max_call_duration: 3600,
        participant_left_timeout: 60,
        enable_recording: false
      }
    };

    // Make the API request to Tavus
    const response = await axios.post(
      "https://tavusapi.com/v2/conversations",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
      }
    );

    // Return the successful response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error creating Tavus conversation:", error);
    
    // Handle different types of errors
    let statusCode = 500;
    let errorMessage = "Failed to create conversation";
    
    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status || 500;
      errorMessage = error.response?.data?.message || errorMessage;
    }
    
    return {
      statusCode,
      headers,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};