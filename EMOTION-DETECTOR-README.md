# 🎥 Emotion Detection Break Reminder

A standalone webcam application that tracks facial expressions in real-time and suggests breaks when detecting stress, tiredness, or unhappiness. Perfect for remote workers, students, and anyone spending long hours in front of a screen.

## ✨ Features

- **Real-time Emotion Detection**: Uses face-api.js to analyze facial expressions
- **Intelligent Break Reminders**: Suggests breaks when unhappy expressions are detected
- **Eye Care Tips**: Built-in tips following the 20-20-20 rule and other best practices
- **Privacy-First**: All processing happens locally in your browser - no data is sent to any server
- **Customizable Settings**: Adjust unhappy threshold and notification preferences
- **Beautiful UI**: Modern, responsive design that works on all devices

## 🚀 How to Use

### Option 1: Direct File Access (Simplest)

1. Open the `emotion-detector.html` file in a modern web browser (Chrome, Firefox, Edge, Safari)
2. Grant camera permissions when prompted
3. Click "Start Detection" to begin monitoring
4. The app will:
   - Show your webcam feed with emotion overlays
   - Track happy, neutral, and sad/tired expressions
   - Suggest breaks when you've been unhappy for the configured duration (default: 2 minutes)

### Option 2: Using a Local Web Server (Recommended)

For better performance and security, serve the files through a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000/emotion-detector.html` in your browser.

## 🌐 Sharing with Multiple People

You mentioned sharing this with multiple people. Here are several approaches:

### 1. **Deploy to a Static Hosting Service** (Easiest for Teams)

Deploy the three files (`emotion-detector.html`, `emotion-detector.css`, `emotion-detector.js`) to any of these free services:

- **Netlify** (Recommended)
  - Drag and drop the files at [netlify.com/drop](https://app.netlify.com/drop)
  - Get a shareable URL instantly
  - Free SSL and custom domains

- **GitHub Pages**
  ```bash
  # Create a new repo and push the files
  git add emotion-detector.*
  git commit -m "Add emotion detector app"
  git push origin main
  # Enable GitHub Pages in repo settings
  ```

- **Vercel**
  - Install Vercel CLI: `npm i -g vercel`
  - Run `vercel` in the directory
  - Get instant deployment

- **Cloudflare Pages**
  - Free, fast CDN
  - Unlimited bandwidth

### 2. **Self-Hosted Solution**

Host on your own server or company intranet:

```bash
# Using nginx
server {
    listen 80;
    server_name emotion-detector.yourcompany.com;
    root /path/to/emotion-detector;
    index emotion-detector.html;
}
```

### 3. **Share as Downloadable Package**

Create a ZIP file with all three files and share via:
- Email
- Company file sharing (Dropbox, Google Drive, OneDrive)
- Internal wiki or documentation

**Usage Instructions for Recipients:**
1. Download and extract the ZIP file
2. Double-click `emotion-detector.html`
3. Grant camera permissions
4. Start using!

### 4. **Browser Extension** (Advanced)

Convert to a Chrome/Firefox extension for easy distribution:
- Create a `manifest.json`
- Package as a browser extension
- Share the `.crx` or `.xpi` file

### 5. **Electron App** (Desktop Application)

Wrap in Electron for a standalone desktop app:

```bash
npm install -g electron
# Create electron wrapper
electron-packager . EmotionDetector --platform=all
```

This creates native apps for Windows, Mac, and Linux.

## ⚙️ Configuration

### Adjusting Sensitivity

Edit these values in `emotion-detector.js`:

```javascript
// Change default unhappy threshold (in minutes)
let unhappyThreshold = 2; // Default: 2 minutes

// Modify emotion detection threshold
if (sad > 0.3) {  // Default: 0.3 (30%)
    // Adjust this value between 0.1 (very sensitive) and 0.7 (less sensitive)
}
```

### Adding Custom Tips

Add your own break tips in the `breakTips` array:

```javascript
const breakTips = [
    "Your custom tip here",
    // ... more tips
];
```

## 🔒 Privacy & Security

- **100% Local Processing**: All emotion detection happens in your browser
- **No Data Collection**: Nothing is sent to external servers
- **Camera Access**: Only used for real-time detection, never recorded
- **No Cookies**: No tracking or persistent storage
- **Open Source**: Inspect the code yourself

## 📋 Requirements

- Modern web browser with WebRTC support (Chrome 53+, Firefox 36+, Safari 11+, Edge 79+)
- Webcam access
- JavaScript enabled
- Internet connection for initial load (to download face-api.js library)

## 🛠️ Technical Details

**Technologies Used:**
- **face-api.js**: TensorFlow.js-based facial recognition
- **Web APIs**: MediaDevices (webcam), Canvas (drawing), Web Audio (notifications)
- **Vanilla JavaScript**: No frameworks, just pure JS
- **CSS3**: Modern styling with gradients and animations

**Models Used:**
- Tiny Face Detector (lightweight, fast detection)
- Face Expression Recognition (emotion classification)
- Face Landmarks (68-point facial feature detection)

## 🐛 Troubleshooting

**Camera not working:**
- Ensure you've granted camera permissions
- Check if another app is using the camera
- Try a different browser
- For HTTPS requirement: use a local server or deploy to hosting

**Models not loading:**
- Check internet connection
- Clear browser cache
- Try a different CDN if jsdelivr.net is blocked

**Slow performance:**
- Close other browser tabs
- Reduce video quality in code
- Use a more powerful device
- Ensure good lighting for faster detection

## 📱 Use Cases

- **Remote Meetings**: Monitor participant engagement
- **Study Sessions**: Track focus and take timely breaks
- **Work from Home**: Prevent burnout with regular break reminders
- **Streaming**: Monitor streamer wellbeing during long sessions
- **Education**: Help students maintain healthy screen habits

## 🤝 Contributing

Feel free to modify and enhance:
- Add more emotion categories
- Implement team/multi-user features
- Add data export for wellness tracking
- Create mobile app version
- Add integration with calendar/task management

## 📄 License

This is a standalone tool. Feel free to use, modify, and share!

## 🎯 Next Steps

### For Individual Use:
1. Open the HTML file and start using it immediately
2. Bookmark it for daily use
3. Customize settings to your preference

### For Team Distribution:
1. Deploy to Netlify or GitHub Pages (5 minutes)
2. Share the URL with your team
3. Add it to your team wiki/documentation
4. Encourage regular breaks!

### For Advanced Users:
1. Integrate with Slack/Teams for team-wide notifications
2. Add analytics dashboard for wellness tracking
3. Create multi-person detection for meeting rooms
4. Build mobile companion app

## 📞 Support

Since this runs entirely in the browser:
- Check browser console for errors (F12)
- Ensure latest browser version
- Test in incognito mode to rule out extensions
- Verify camera works in other apps

---

**Remember**: Regular breaks are essential for productivity and health. Let technology help you take care of yourself! 💚
