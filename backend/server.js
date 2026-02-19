const express = require('express');
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// 1. Setup Google Auth using your Robot's JSON file
const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json', 
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

// 2. The Webhook Endpoint (Vapi will call this)
app.post('/webhook', async (req, res) => {
  console.log("🚀 Vapi called the webhook!");

  try {
    // Vapi sends data inside message.toolCalls
    const toolCall = req.body.message?.toolCalls?.[0];
    
    if (!toolCall) {
      return res.status(400).json({ error: "No tool call found" });
    }

    const { attendee_name, date, time } = toolCall.function.arguments;
    const startDateTime = `${date}T${time}:00Z`; // Formats to ISO string

    const event = {
      summary: `Meeting with ${attendee_name}`,
      description: 'Scheduled by Vikara AI Voice Agent',
      start: { dateTime: startDateTime, timeZone: 'UTC' },
      end: { 
        dateTime: new Date(new Date(startDateTime).getTime() + 30 * 60000).toISOString(),
        timeZone: 'UTC' 
      },
    };

    // 3. Insert into your Google Calendar
    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID, // Your personal email from .env
      resource: event,
    });

    // 4. Respond to Vapi (REQUIRED FORMAT)
    res.status(201).json({
      results: [
        {
          toolCallId: toolCall.id,
          result: `Successfully booked the meeting for ${attendee_name} on ${date} at ${time}.`
        }
      ]
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server live on port ${PORT}`));