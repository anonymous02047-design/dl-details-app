# DL Details Automation - Next.js Application

A modern, automated Driving License details form built with Next.js, featuring comprehensive form fields, image uploads, and export functionality.

## Features

### 📋 Complete Form Fields
- **Personal Information**: DL Number, Name, Date of Birth, Gender
- **Family Details**: Son/Wife/Daughter of
- **Medical Information**: Blood Group, Organ Donor status
- **Address Information**: Permanent and Temporary addresses
- **License Details**: COV (Class of Vehicle), Issue Date
- **Additional Fields**: Badge Number, NT/TR Validity, Mobile Number
- **Images**: Candidate Photo and Signature upload

### 🖼️ Image Upload
- Drag & drop or click to upload candidate photo
- Signature upload functionality
- Image preview with proper sizing
- Support for common image formats

### 🖨️ Print & Export Options
- **Print**: Direct browser printing with optimized layout
- **PDF Export**: Generate PDF with all form data
- **CSV Export**: Export data in spreadsheet format
- **Clear Form**: Reset all fields with one click

### 🎨 Modern UI/UX
- Responsive design for all devices
- Clean, professional interface
- Intuitive form layout
- Visual icons for better user experience
- Print-optimized styling

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Quick Deploy to Netlify

1. **Fork this repository** on GitHub
2. **Connect to Netlify:**
   - Go to [Netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your forked repository
   - Build settings are pre-configured
3. **Deploy:** Click "Deploy site"

### Manual Deployment

```bash
# Windows
deploy.bat

# Mac/Linux
./deploy.sh
```

### Deployment Features
- ✅ **Automatic builds** on every push
- ✅ **Free hosting** on Netlify
- ✅ **Custom domain** support
- ✅ **SSL certificate** included
- ✅ **Global CDN** for fast loading

## Usage

1. **Fill the Form**: Enter all required DL details in the form fields
2. **Upload Images**: Click on the image containers to upload candidate photo and signature
3. **Print**: Use the Print button for direct printing
4. **Export**: Choose PDF or CSV export options
5. **Clear**: Reset the form to start over

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Print Functionality**: react-to-print
- **File Handling**: HTML5 File API

## File Structure

```
├── app/
│   ├── globals.css          # Global styles and print styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main DL details page
├── public/
│   ├── Pic.jpg              # Sample candidate image
│   └── Sig.jpg              # Sample signature image
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## Form Fields Included

| Field | Type | Description |
|-------|------|-------------|
| DL Number | Text | Driving License Number |
| Date of Birth | Date | Birth date |
| Name | Text | Full name |
| S/W/D | Text | Son/Wife/Daughter of |
| Blood Group | Select | Blood group selection |
| Nationality | Text | Nationality |
| Permanent Address | Textarea | Permanent residence |
| Temporary Address | Textarea | Current residence |
| COV | Text | Class of Vehicle |
| Issue Date | Date | License issue date |
| Gender | Select | Gender selection |
| Organ Donor | Select | Organ donation status |
| Badge Number | Text | Badge number |
| Badge Issue Date | Date | Badge issue date |
| NT Validity | Date | NT validity date |
| TR Validity | Date | TR validity date |
| Last Endorse Auth | Text | Last endorsement authority |
| Mobile Number | Tel | Contact number |
| Candidate Image | File | Photo upload |
| Candidate Signature | File | Signature upload |

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, email your-email@example.com or create an issue in the repository.
