# 😊 Emotion Break Reminder - Webcam Tracker

A standalone web application that uses AI-powered facial expression detection to track participants' emotions and provide timely break reminders when stress levels are elevated.

## 🌟 Features

- **Real-time Emotion Detection**: Uses face-api.js to detect and analyze facial expressions in real-time
- **Multi-Face Support**: Can track multiple people simultaneously
- **Privacy-First**: All processing happens locally in the browser - no data is sent to any server
- **Smart Break Reminders**: Automatically suggests breaks when negative emotions exceed a threshold
- **Customizable Settings**: Adjust sensitivity, check intervals, and detection speed
- **Beautiful UI**: Modern, responsive design with real-time statistics and visualizations
- **Eye Care Tips**: Provides helpful reminders for eye health (20-20-20 rule) and stress relief

## 🎯 Use Cases

- **Remote Work**: Monitor your own stress levels during long work sessions
- **Video Meetings**: Track team mood during virtual meetings (requires screen sharing)
- **Study Sessions**: Know when to take breaks during intensive learning
- **Content Creation**: Monitor your emotional state during recording/streaming
- **Wellness Tracking**: Personal tool for emotional awareness

## 🚀 Getting Started

### Option 1: Direct Browser Usage (Easiest)

1. Open the `emotion-detector.html` file directly in a modern web browser (Chrome, Firefox, Edge, Safari)
2. Grant camera permissions when prompted
3. Click "Start Tracking"
4. That's it! The app will now monitor emotions and provide break suggestions

### Option 2: Local Web Server

For better performance and additional features:

```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve .

# Then open http://localhost:8000/emotion-detector.html
```

### Option 3: Deploy to Web Hosting

Deploy to any static hosting service:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=. --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**GitHub Pages:**
1. Push the `emotion-detector.html` file to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://yourusername.github.io/repository-name/emotion-detector.html`

## 📱 Sharing with Multiple People

Since this is a client-side app, here are ways to share it with your team:

### 1. **Web Deployment (Recommended)**
Deploy to any hosting service and share the URL. Each person can:
- Open the app in their own browser
- Track their own emotions independently
- Get personalized break reminders

### 2. **Screen Share in Video Calls**
For group monitoring during video meetings:
- One person runs the app pointing at their screen showing all participants
- Use in Zoom/Teams/Meet by screen sharing your video feed
- The app will detect all visible faces

### 3. **Distributed Setup**
- Each participant runs the app on their own device
- Create a shared communication channel (Slack/Discord) for break notifications
- Use browser notifications or integrate with team communication tools

### 4. **Local Network Sharing**
For in-office use:
```bash
# Start server accessible on local network
python -m http.server 8000 --bind 0.0.0.0

# Team members can access via
# http://[YOUR_LOCAL_IP]:8000/emotion-detector.html
```

## ⚙️ Configuration

The app includes customizable settings:

- **Unhappy Threshold (%)**: Percentage of negative emotions that triggers a break reminder (default: 30%)
- **Check Interval**: How often to evaluate if a break is needed (default: 30 seconds)
- **Detection Speed**: How frequently to analyze the video feed (default: 500ms)

### Emotion Categories

The app tracks 7 emotion types:
- 😊 Happy
- 😢 Sad
- 😠 Angry
- 😨 Fearful
- 🤢 Disgusted
- 😲 Surprised
- 😐 Neutral

**Negative emotions** (sad, angry, fearful, disgusted) trigger break reminders when they exceed the threshold.

## 💡 Tips for Best Results

1. **Lighting**: Ensure good lighting for accurate face detection
2. **Camera Angle**: Position the camera to clearly see faces
3. **Distance**: Sit 2-3 feet from the camera for optimal detection
4. **Browser**: Use Chrome or Edge for best performance
5. **Thresholds**: Adjust settings based on your work environment and sensitivity needs

## 🔒 Privacy & Security

- ✅ All processing happens locally in your browser
- ✅ No video or image data is sent to any server
- ✅ No data is stored or logged
- ✅ Camera access is controlled by you via browser permissions
- ✅ Open source - you can review the code

## 🛠️ Technical Details

### Technologies Used
- **face-api.js**: TensorFlow.js-based face detection and expression recognition
- **Vanilla JavaScript**: No framework dependencies
- **WebRTC**: For webcam access
- **Canvas API**: For drawing detection overlays

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### AI Models
- TinyFaceDetector: Fast face detection optimized for real-time use
- Face Expression Net: 7-emotion classification model

## 🐛 Troubleshooting

**Camera not working?**
- Check browser permissions (look for camera icon in address bar)
- Ensure no other app is using the camera
- Try a different browser

**Models not loading?**
- Check your internet connection (models load from CDN)
- Try refreshing the page
- Check browser console for errors

**Poor detection accuracy?**
- Improve lighting conditions
- Move closer/further from camera
- Ensure face is clearly visible
- Adjust detection speed in settings

**Break reminders too frequent/infrequent?**
- Adjust the "Unhappy Threshold" percentage
- Increase/decrease "Check Interval"
- Reset emotion statistics by stopping and restarting

## 🚀 Advanced: Integration Ideas

### Webhook Notifications
Add this code to send break reminders to Slack/Discord:

```javascript
async function sendWebhookNotification(message) {
    const webhookURL = 'YOUR_WEBHOOK_URL';
    await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
    });
}
```

### Browser Notifications
Add this to `showBreakAlert()`:

```javascript
if (Notification.permission === "granted") {
    new Notification("Time for a Break!", {
        body: "We detected elevated stress levels.",
        icon: "🧘"
    });
}
```

### Data Export
Add emotion tracking history export:

```javascript
function exportEmotionData() {
    const data = {
        timestamp: new Date().toISOString(),
        emotions: emotionCounts,
        duration: trackingDuration
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], 
        { type: 'application/json' });
    // Download as file
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emotion-data.json';
    a.click();
}
```

## 🤝 Contributing

This is a standalone tool. Feel free to modify and extend it:
- Add new emotion categories
- Integrate with productivity tools
- Create team dashboards
- Add historical tracking

## 📄 License

This tool uses face-api.js which is MIT licensed. The code is free to use, modify, and distribute.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Ensure all dependencies are loading correctly
4. Test in a different browser

## 🎨 Customization

The app is fully customizable. Edit the HTML file to:
- Change colors and styling (CSS section)
- Modify detection logic (JavaScript section)
- Add new features and integrations
- Customize break reminder messages

Enjoy healthier, more mindful work sessions! 😊🧘‍♀️
