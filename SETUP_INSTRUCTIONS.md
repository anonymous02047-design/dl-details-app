# Quick Setup Instructions

## 🚀 Getting Started

### Option 1: Automatic Setup (Windows)
1. Double-click `install-and-run.bat`
2. Wait for dependencies to install
3. Browser will automatically open to `http://localhost:3000`

### Option 2: Manual Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

## 📋 Features Included

✅ **Complete Form Fields** - All 18 fields from original HTML
✅ **Image Upload** - Candidate photo and signature
✅ **Print Functionality** - Direct browser printing
✅ **PDF Export** - Generate PDF with form data
✅ **CSV Export** - Export to spreadsheet format
✅ **Demo Data** - Load sample data to test
✅ **Responsive Design** - Works on all devices
✅ **Modern UI** - Clean, professional interface

## 🎯 How to Use

1. **Load Demo Data** (optional) - Click "Load Demo Data" to see sample information
2. **Fill Form** - Enter DL details in all fields
3. **Upload Images** - Click image areas to upload photo and signature
4. **Print/Export** - Use buttons to print or export data
5. **Clear Form** - Reset all fields to start over

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   └── DemoDataLoader.tsx    # Demo data component
│   ├── globals.css               # Styles and print CSS
│   ├── layout.tsx                # App layout
│   └── page.tsx                  # Main DL form page
├── public/
│   ├── Pic.jpg                   # Sample candidate image
│   └── Sig.jpg                   # Sample signature image
├── install-and-run.bat           # Windows setup script
├── package.json                  # Dependencies
└── README.md                     # Full documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🆘 Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies not installing?**
```bash
npm cache clean --force
npm install
```

**Images not loading?**
- Check that `Pic.jpg` and `Sig.jpg` are in the `public/` folder
- Ensure file names match exactly (case-sensitive)

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify Node.js version is 18 or higher
4. Try clearing browser cache

---

**Ready to go!** 🎉 Your automated DL details form is now ready to use.
