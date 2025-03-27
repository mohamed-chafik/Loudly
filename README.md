# Voice-Controlled News Reader for the Visually Impaired  

A **React-based** web app that allows visually impaired users to:  
- **Search & read news** using voice commands  
- **Control playback** (pause, stop, continue) with voice  
- **Click anywhere to start/stop** voice interaction  

**Live Demo:** [Netlify Link](#) *(Replace with your URL)*  

---

## Key Features  
🎙 **Voice-Activated Search** – Click the screen, speak a query, and get news.  
📢 **Voice Commands** – "Stop", "Pause", "Continue" control playback.  
📰 **Dynamic News Fetching** – Uses NewsAPI to fetch real-time articles.  
---

## How It Works  
1. User clicks anywhere → App starts listening  
2. User speaks:  
   - If phrase is a **command** (`stop`, `pause`, `continue`), controls playback  
   - Otherwise, **searches for news** on the spoken query  
3. App reads headlines/articles aloud using TTS  

---

## Tech Stack  
- **Frontend**: React.js (Vite)  
- **Voice Recognition**: Web Speech API  
- **News API**: [NewsAPI.org](https://newsapi.org/)  
- **Deployment**: Netlify  

---

## Setup & Run Locally  
```sh
git clone https://github.com/mohamed-chafik/Loudly
cd Loudly
npm install
```

Create `.env` file:
```env
VITE_NEWS_API_KEY=your_api_key_here
```

Run:
```sh
npm run dev
```

---

## Voice Commands Reference  
| Command     | Action                          |
|-------------|---------------------------------|
| "Stop"      | Immediately stops reading       |
| "Pause"     | Pauses playback                 |
| "Continue"  | Resumes reading                 |
| *Other*     | Searches news on spoken phrase  |

---

## Browser Support  
| Browser    | Support        |
|------------|----------------|
| Chrome     | ✅ Full        |
| Edge       | ✅ Full        |
| Firefox    | ⚠️ Partial    |
| Safari     | ⚠️ Limited    |

---

## Future Improvements  
- [ ] More voice commands ("Next article"...)
- [ ] More Browser Support
- [ ] Better speech Recognization
- [ ] Keyboard Navigation
- [ ] Better error handling  
- [ ] Multi-language support  

---

```diff
+ Developed with ❤️ for accessibility
! Contributions welcome
```
