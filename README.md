# 🐛 "Submit Button Does Nothing" Demo

## Overview
Interactive demonstration for Product Owners to understand and investigate the common issue: **"After clicking Submit, nothing happens."**

This demo showcases two real-world scenarios that cause this problem and teaches POs how to:
- Clarify issues with stakeholders
- Reproduce problems effectively
- Communicate with developers using technical language
- Identify root causes (frontend validation vs. network errors)

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open your browser to the displayed URL (usually http://localhost:5173)

## 📖 Documentation

- **[PO_ANSWER.md](./PO_ANSWER.md)** - Complete answer to the Product Owner interview question with investigation framework
- **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - Detailed testing instructions for both scenarios

## 🎯 Two Scenarios Demonstrated

### Scenario 1: Silent Validation Failure 🔴
Form validation fails but errors aren't displayed to users.
- **What happens:** Validation runs, finds errors, but UI shows nothing
- **User experience:** "Nothing happens" when clicking Submit
- **What to check:** Browser console shows validation errors

### Scenario 2: Network Error 🔴  
API call fails without proper user feedback.
- **What happens:** Network request sent but fails, no error message shown
- **User experience:** Brief loading state, then "nothing happens"
- **What to check:** Browser console + Network tab show failed requests

## 🔍 How to Test

1. Open the app in your browser
2. Choose a scenario button at the top
3. **Open Browser DevTools (F12)** - this is crucial!
4. Try to submit the form
5. Compare what you see vs. what's in the console
6. See detailed steps in [DEMO_GUIDE.md](./DEMO_GUIDE.md)

## 📋 Product Owner Checklist

When stakeholders report "Submit does nothing":

✅ **Clarify:** Which page? Which browser? Which device?  
✅ **Reproduce:** Try it yourself with exact steps  
✅ **Ask developers:** "Are there console errors? Is the network request sent?"  
✅ **Consider causes:** Frontend validation? Network error? UI blocking?

## 💡 Key Learning Points

1. **"Nothing happens" is misleading** - Something IS happening, just not visible
2. **Console and Network tabs are essential** - Always check these first
3. **Ask specific technical questions** - Not "why doesn't it work?" but "Is the network call triggered?"
4. **Multiple possible causes** - Validation, network, backend, UI state
5. **Clear reproduction steps save time** - Document everything

## 🛠️ Built With

- React 18
- Vite
- Modern CSS (no frameworks needed for this demo)

## 📚 For Interviewers

This demo answers the question:
> "A stakeholder writes that after filling in a form and clicking the Submit button, nothing happens. As a Product Owner, what would be your first step?"

The expected approach includes:
- Clarifying the issue with specific questions
- Verifying and reproducing the problem
- Understanding common technical causes
- Communicating effectively with developers

See [PO_ANSWER.md](./PO_ANSWER.md) for the complete answer framework.
# po-test
