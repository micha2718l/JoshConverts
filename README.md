# JoshConverts
A fun conversion app themed to Josh and Chuck from Stuff You Should Know.

## About
JoshConverts is a simple web portal that lets you convert quantities into fun comparisons! Enter anything like "20,000 pickup trucks" or "1000 big macs" and get back a list of equivalent amounts in other items.

## Features
- 🎙️ SYSK-themed design and branding
- 🗣️ Natural language input - ask questions like you're talking to a friend!
- 🎭 Fun, personality-driven responses inspired by Josh & Chuck
- 📊 Convert between various items (vehicles, animals, food, landmarks)
- 💡 Fun facts for different conversions
- 📱 Responsive design works on any device
- ⚡ Pure client-side - no server required!
- 🔒 No external dependencies or API calls - 100% private and offline-capable

## How to Use
1. Open `index.html` in any web browser
2. Enter your question using natural language! Try any of these formats:
   - "how many cats equal a blue whale?"
   - "convert 5 elephants"
   - "100 big macs to bowling balls"
   - "what is 2000 apples?"
   - Or the classic: "1000 elephants"
3. Click "Convert It!" to see the conversions
4. Learn something interesting from the fun facts!
5. Enjoy the fun, off-the-cuff responses from Josh & Chuck!

## Supported Items
- **Vehicles**: pickup trucks, cars, school buses
- **Animals**: elephants, blue whales, cats, dogs, horses, giraffes
- **Food**: Big Macs, apples, bananas, potatoes, watermelons
- **Objects**: bowling balls, grand pianos
- **Landmarks**: Statue of Liberty, Eiffel Tower
- And more!

## Hosting
This is a static site that can be:
- Opened directly from the filesystem
- Hosted on any static web server (Apache, Nginx, etc.)
- Deployed to GitHub Pages, Netlify, Vercel, or any static hosting service

Example using Python's built-in server:
```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

## Technical Details
- Pure HTML, CSS, and JavaScript
- No dependencies or build process
- Custom lightweight natural language processing (NLP) parser
- All conversion data stored in JavaScript objects
- Client-side only - no backend required
- Multiple input pattern recognition:
  - Question format: "how many X equal Y?"
  - Convert format: "convert X"
  - Comparison format: "X to Y"
  - Query format: "what is X?"
  - Simple format: "number + item"

## Credits
Inspired by the amazing podcast Stuff You Should Know by Josh Clark and Chuck Bryant! 
