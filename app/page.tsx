'use client'

import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import jsPDF from 'jspdf'
import { 
  Download, 
  Printer, 
  FileText, 
  Upload, 
  User, 
  Calendar,
  MapPin,
  Phone,
  CreditCard,
  Heart,
  Shield,
  Car
} from 'lucide-react'

interface DLFormData {
  dlNumber: string
  dob: string
  name: string
  fatherHusbandName: string
  bloodGroup: string
  nationality: string
  permanentAddress: string
  temporaryAddress: string
  cov: string
  issueDate: string
  gender: string
  organDonor: string
  badgeNo: string
  badgeIssueDate: string
  ntValidity: string
  trValidity: string
  lastEndorseAuth: string
  mobileNumber: string
  candidateImage: string | null
  candidateSignature: string | null
}

export default function DLDetailsPage() {
  const [formData, setFormData] = useState<DLFormData>({
    dlNumber: '',
    dob: '',
    name: '',
    fatherHusbandName: '',
    bloodGroup: '',
    nationality: '',
    permanentAddress: '',
    temporaryAddress: '',
    cov: '',
    issueDate: '',
    gender: '',
    organDonor: '',
    badgeNo: '',
    badgeIssueDate: '',
    ntValidity: '',
    trValidity: '',
    lastEndorseAuth: '',
    mobileNumber: '',
    candidateImage: null,
    candidateSignature: null
  })

  const [showPreview, setShowPreview] = useState(false)

  const printRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (field: keyof DLFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (field: 'candidateImage' | 'candidateSignature', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [field]: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'DL Details - Driving License Information',
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
        background: white !important;
        color: #1f2937 !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .page-container {
        background: white !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .main-container {
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .header-section {
        text-align: center !important;
        margin-bottom: 20px !important;
        padding-bottom: 15px !important;
        border-bottom: 2px solid #e5e7eb !important;
      }
      .main-title {
        font-size: 24px !important;
        font-weight: bold !important;
        color: #1e40af !important;
        margin-bottom: 8px !important;
      }
      .subtitle {
        font-size: 12px !important;
        color: #6b7280 !important;
        margin-bottom: 4px !important;
      }
      .source-url {
        font-size: 12px !important;
        color: #2563eb !important;
        font-weight: 600 !important;
      }
      .form-container {
        background: white !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        border: 1px solid #d1d5db !important;
        margin: 0 !important;
        padding: 20px !important;
        max-width: none !important;
      }
      .form-table {
        width: 100% !important;
        border-collapse: collapse !important;
        font-size: 13px !important;
        margin-top: 0 !important;
      }
      .form-table td {
        padding: 10px !important;
        border: 1px solid #d1d5db !important;
        vertical-align: top !important;
      }
      .form-table td:first-child {
        background-color: #f8fafc !important;
        font-weight: 600 !important;
        width: 35% !important;
        color: #374151 !important;
      }
      .form-input {
        border: 1px solid #d1d5db !important;
        border-radius: 4px !important;
        padding: 6px 8px !important;
        font-size: 12px !important;
        background: white !important;
        color: #1f2937 !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .field-label {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        font-weight: 600 !important;
        color: #374151 !important;
      }
      .icon {
        width: 14px !important;
        height: 14px !important;
        color: #6b7280 !important;
      }
      .image-container {
        width: 100px !important;
        height: 100px !important;
        border: 2px solid #d1d5db !important;
        border-radius: 4px !important;
        background-color: #f9fafb !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: relative !important;
      }
      .image-container img {
        max-width: 100% !important;
        max-height: 100% !important;
        object-fit: cover !important;
        border-radius: 2px !important;
      }
      .upload-placeholder {
        text-align: center !important;
        color: #6b7280 !important;
        font-size: 10px !important;
      }
      .no-print {
        display: none !important;
      }
      .button-group {
        display: none !important;
      }
    `,
    onBeforeGetContent: () => {
      // Ensure images are loaded before printing
      const images = printRef.current?.querySelectorAll('img');
      if (images) {
        return Promise.all(
          Array.from(images).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          })
        );
      }
      return Promise.resolve();
    }
  })

  const exportToPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // Set up colors
    const primaryColor: [number, number, number] = [30, 64, 175] // Blue-600
    const lightGray: [number, number, number] = [248, 250, 252] // Gray-50
    const borderGray: [number, number, number] = [209, 213, 219] // Gray-300
    
    // Header Section with proper styling
    pdf.setFillColor(...primaryColor)
    pdf.rect(0, 0, pageWidth, 25, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'bold')
    pdf.text('DL Details', pageWidth / 2, 12, { align: 'center' })
    
    // Subtitle
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Please check response is coming from', pageWidth / 2, 16, { align: 'center' })
    pdf.text('https://sarathi.parivahan.gov.in/...', pageWidth / 2, 19, { align: 'center' })
    
    // Reset text color
    pdf.setTextColor(31, 41, 55) // Gray-800
    
    // Photo and Signature Section
    let yPos = 35
    
    // Photo section with proper async handling
    const addPhotoToPDF = () => {
      return new Promise<void>((resolve) => {
        if (formData.candidateImage) {
          try {
            const img = new Image()
            img.onload = () => {
              const imgWidth = 25
              const imgHeight = 30
              pdf.addImage(img, 'JPEG', 20, yPos, imgWidth, imgHeight)
              resolve()
            }
            img.onerror = () => {
              // If image fails to load, draw a placeholder
              pdf.setFillColor(...lightGray)
              pdf.rect(20, yPos, 25, 30, 'F')
              pdf.setDrawColor(...borderGray)
              pdf.rect(20, yPos, 25, 30)
              pdf.setFontSize(8)
              pdf.setTextColor(107, 114, 128)
              pdf.text('Photo', 32.5, yPos + 18, { align: 'center' })
              resolve()
            }
            img.src = formData.candidateImage
          } catch (e) {
            // If image fails to load, draw a placeholder
            pdf.setFillColor(...lightGray)
            pdf.rect(20, yPos, 25, 30, 'F')
            pdf.setDrawColor(...borderGray)
            pdf.rect(20, yPos, 25, 30)
            pdf.setFontSize(8)
            pdf.setTextColor(107, 114, 128)
            pdf.text('Photo', 32.5, yPos + 18, { align: 'center' })
            resolve()
          }
        } else {
          pdf.setFillColor(...lightGray)
          pdf.rect(20, yPos, 25, 30, 'F')
          pdf.setDrawColor(...borderGray)
          pdf.rect(20, yPos, 25, 30)
          pdf.setFontSize(8)
          pdf.setTextColor(107, 114, 128)
          pdf.text('Photo', 32.5, yPos + 18, { align: 'center' })
          resolve()
        }
      })
    }
    
    // Signature section with proper async handling
    const addSignatureToPDF = () => {
      return new Promise<void>((resolve) => {
        if (formData.candidateSignature) {
          try {
            const img = new Image()
            img.onload = () => {
              const imgWidth = 25
              const imgHeight = 15
              pdf.addImage(img, 'JPEG', pageWidth - 45, yPos, imgWidth, imgHeight)
              resolve()
            }
            img.onerror = () => {
              pdf.setFillColor(...lightGray)
              pdf.rect(pageWidth - 45, yPos, 25, 15, 'F')
              pdf.setDrawColor(...borderGray)
              pdf.rect(pageWidth - 45, yPos, 25, 15)
              pdf.setFontSize(8)
              pdf.setTextColor(107, 114, 128)
              pdf.text('Signature', pageWidth - 32.5, yPos + 9, { align: 'center' })
              resolve()
            }
            img.src = formData.candidateSignature
          } catch (e) {
            pdf.setFillColor(...lightGray)
            pdf.rect(pageWidth - 45, yPos, 25, 15, 'F')
            pdf.setDrawColor(...borderGray)
            pdf.rect(pageWidth - 45, yPos, 25, 15)
            pdf.setFontSize(8)
            pdf.setTextColor(107, 114, 128)
            pdf.text('Signature', pageWidth - 32.5, yPos + 9, { align: 'center' })
            resolve()
          }
        } else {
          pdf.setFillColor(...lightGray)
          pdf.rect(pageWidth - 45, yPos, 25, 15, 'F')
          pdf.setDrawColor(...borderGray)
          pdf.rect(pageWidth - 45, yPos, 25, 15)
          pdf.setFontSize(8)
          pdf.setTextColor(107, 114, 128)
          pdf.text('Signature', pageWidth - 32.5, yPos + 9, { align: 'center' })
          resolve()
        }
      })
    }
    
    // Main content area
    yPos = 75
    
    // Create a professional table structure
    const fields = [
      { label: 'DL No.', value: formData.dlNumber },
      { label: 'D.O.B', value: formData.dob },
      { label: 'Name', value: formData.name },
      { label: 'S/W/D', value: formData.fatherHusbandName },
      { label: 'Blood Group', value: formData.bloodGroup },
      { label: 'Nationality', value: formData.nationality },
      { label: 'Permanent Address', value: formData.permanentAddress },
      { label: 'Temporary Address', value: formData.temporaryAddress },
      { label: 'COV', value: formData.cov },
      { label: 'Issue Date', value: formData.issueDate },
      { label: 'Gender', value: formData.gender },
      { label: 'Organ Donor', value: formData.organDonor },
      { label: 'Badge No', value: formData.badgeNo },
      { label: 'Badge Issue Date', value: formData.badgeIssueDate },
      { label: 'NT Validity', value: formData.ntValidity },
      { label: 'TR Validity', value: formData.trValidity },
      { label: 'Last Endorse Auth', value: formData.lastEndorseAuth },
      { label: 'Mobile Number', value: formData.mobileNumber }
    ]
    
    // Draw fields in a professional table format
    const labelWidth = 50
    const valueWidth = pageWidth - 70 - labelWidth
    const rowHeight = 8
    const startX = 20
    
    fields.forEach((field, index) => {
      const currentY = yPos + (index * rowHeight)
      
      // Label background
      pdf.setFillColor(...lightGray)
      pdf.rect(startX, currentY, labelWidth, rowHeight, 'F')
      
      // Label text
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(55, 65, 81) // Gray-700
      pdf.text(field.label + ':', startX + 3, currentY + 5.5)
      
      // Value background
      pdf.setFillColor(255, 255, 255)
      pdf.rect(startX + labelWidth, currentY, valueWidth, rowHeight, 'F')
      
      // Value text
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(31, 41, 55) // Gray-800
      const value = field.value || 'Not provided'
      pdf.text(value, startX + labelWidth + 3, currentY + 5.5)
      
      // Border
      pdf.setDrawColor(...borderGray)
      pdf.rect(startX, currentY, labelWidth + valueWidth, rowHeight)
    })
    
    // Footer
    const footerY = pageHeight - 15
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'italic')
    pdf.setTextColor(107, 114, 128) // Gray-500
    pdf.text('Generated on: ' + new Date().toLocaleDateString(), pageWidth / 2, footerY, { align: 'center' })
    
    // Handle images asynchronously and then save
    Promise.all([addPhotoToPDF(), addSignatureToPDF()]).then(() => {
      pdf.save('dl-details.pdf')
    })
  }

  const exportToCSV = () => {
    const csvContent = [
      ['Field', 'Value'],
      ['DL No.', formData.dlNumber],
      ['D.O.B', formData.dob],
      ['Name', formData.name],
      ['S/W/D', formData.fatherHusbandName],
      ['Blood Group', formData.bloodGroup],
      ['Nationality', formData.nationality],
      ['Permanent Address', formData.permanentAddress],
      ['Temporary Address', formData.temporaryAddress],
      ['COV', formData.cov],
      ['Issue Date', formData.issueDate],
      ['Gender', formData.gender],
      ['Organ Donor', formData.organDonor],
      ['Badge No', formData.badgeNo],
      ['Badge Issue Date', formData.badgeIssueDate],
      ['NT Validity', formData.ntValidity],
      ['TR Validity', formData.trValidity],
      ['Last Endorse Auth', formData.lastEndorseAuth],
      ['Mobile Number', formData.mobileNumber]
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dl-details.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const clearForm = () => {
    if (window.confirm('Are you sure you want to clear all form data?')) {
      setFormData({
        dlNumber: '',
        dob: '',
        name: '',
        fatherHusbandName: '',
        bloodGroup: '',
        nationality: '',
        permanentAddress: '',
        temporaryAddress: '',
        cov: '',
        issueDate: '',
        gender: '',
        organDonor: '',
        badgeNo: '',
        badgeIssueDate: '',
        ntValidity: '',
        trValidity: '',
        lastEndorseAuth: '',
        mobileNumber: '',
        candidateImage: null,
        candidateSignature: null
      })
    }
  }

  const validateForm = () => {
    const requiredFields = ['dlNumber', 'name', 'dob', 'fatherHusbandName', 'nationality']
    const missingFields = requiredFields.filter(field => !formData[field as keyof DLFormData])
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`)
      return false
    }
    return true
  }

  const handleExportPDF = () => {
    if (validateForm()) {
      exportToPDF()
    }
  }

  const handleExportCSV = () => {
    if (validateForm()) {
      exportToCSV()
    }
  }

  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true)
    }
  }

  const closePreview = () => {
    setShowPreview(false)
  }

  const handlePrintFromPreview = () => {
    setShowPreview(false)
    setTimeout(() => {
      handlePrint()
    }, 100)
  }

  const handleExportPDFFromPreview = () => {
    setShowPreview(false)
    setTimeout(() => {
      exportToPDF()
    }, 100)
  }


  return (
    <div className="page-container">
      <div className="main-container">
        <div className="header-section">
          <h1 className="main-title">DL Details</h1>
          <p className="subtitle">Please check response is coming from</p>
          <p className="source-url">https://sarathi.parivahan.gov.in/...</p>
        </div>


        <div className="form-container print-container" ref={printRef}>
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <label className="field-label">
                    <User className="icon" />
                    <b>Candidate Image:</b>
                  </label>
                </td>
                <td>
                  <div className="image-container">
                    {formData.candidateImage ? (
                      <img 
                        src={formData.candidateImage} 
                        alt="Candidate" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className="upload-placeholder" style={{ display: formData.candidateImage ? 'none' : 'flex' }}>
                      <Upload className="upload-icon" />
                      <span className="upload-text">Upload Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('candidateImage', e)}
                      className="file-input"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <FileText className="icon" />
                    <b>Candidate Signature:</b>
                  </label>
                </td>
                <td>
                  <div className="image-container">
                    {formData.candidateSignature ? (
                      <img 
                        src={formData.candidateSignature} 
                        alt="Signature" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className="upload-placeholder" style={{ display: formData.candidateSignature ? 'none' : 'flex' }}>
                      <Upload className="upload-icon" />
                      <span className="upload-text">Upload Signature</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload('candidateSignature', e)}
                      className="file-input"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <CreditCard className="icon" />
                    <b>DL No.:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.dlNumber}
                    onChange={(e) => handleInputChange('dlNumber', e.target.value)}
                    placeholder="Enter DL Number"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Calendar className="icon" />
                    <b>D.O.B:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <User className="icon" />
                    <b>Name:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter Full Name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <User className="icon" />
                    <b>S/W/D:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.fatherHusbandName}
                    onChange={(e) => handleInputChange('fatherHusbandName', e.target.value)}
                    placeholder="Son/Wife/Daughter of"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Heart className="icon" />
                    <b>Blood Group:</b>
                  </label>
                </td>
                <td>
                  <select
                    className="form-input"
                    value={formData.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+ (A Positive)</option>
                    <option value="A-">A- (A Negative)</option>
                    <option value="B+">B+ (B Positive)</option>
                    <option value="B-">B- (B Negative)</option>
                    <option value="AB+">AB+ (AB Positive)</option>
                    <option value="AB-">AB- (AB Negative)</option>
                    <option value="O+">O+ (O Positive)</option>
                    <option value="O-">O- (O Negative)</option>
                    <option value="A1+">A1+ (A1 Positive)</option>
                    <option value="A1-">A1- (A1 Negative)</option>
                    <option value="A2+">A2+ (A2 Positive)</option>
                    <option value="A2-">A2- (A2 Negative)</option>
                    <option value="B1+">B1+ (B1 Positive)</option>
                    <option value="B1-">B1- (B1 Negative)</option>
                    <option value="B2+">B2+ (B2 Positive)</option>
                    <option value="B2-">B2- (B2 Negative)</option>
                    <option value="A1B+">A1B+ (A1B Positive)</option>
                    <option value="A1B-">A1B- (A1B Negative)</option>
                    <option value="A2B+">A2B+ (A2B Positive)</option>
                    <option value="A2B-">A2B- (A2B Negative)</option>
                    <option value="Bombay">Bombay (Oh)</option>
                    <option value="Rh-null">Rh-null (Golden Blood)</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Shield className="icon" />
                    <b>Nationality:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    placeholder="Enter Nationality"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <MapPin className="icon" />
                    <b>Permanent Address:</b>
                  </label>
                </td>
                <td>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                    placeholder="Enter Permanent Address"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <MapPin className="icon" />
                    <b>Temporary Address:</b>
                  </label>
                </td>
                <td>
                  <textarea
                    className="form-input"
                    rows={3}
                    value={formData.temporaryAddress}
                    onChange={(e) => handleInputChange('temporaryAddress', e.target.value)}
                    placeholder="Enter Temporary Address"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Car className="icon" />
                    <b>COV:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.cov}
                    onChange={(e) => handleInputChange('cov', e.target.value)}
                    placeholder="Class of Vehicle"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Calendar className="icon" />
                    <b>Issue Date:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.issueDate}
                    onChange={(e) => handleInputChange('issueDate', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <User className="icon" />
                    <b>Gender:</b>
                  </label>
                </td>
                <td>
                  <select
                    className="form-input"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Heart className="icon" />
                    <b>Organ Donor:</b>
                  </label>
                </td>
                <td>
                  <select
                    className="form-input"
                    value={formData.organDonor}
                    onChange={(e) => handleInputChange('organDonor', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Shield className="icon" />
                    <b>Badge No:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.badgeNo}
                    onChange={(e) => handleInputChange('badgeNo', e.target.value)}
                    placeholder="Enter Badge Number"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Calendar className="icon" />
                    <b>Badge Issue Date:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.badgeIssueDate}
                    onChange={(e) => handleInputChange('badgeIssueDate', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Calendar className="icon" />
                    <b>NT Validity:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.ntValidity}
                    onChange={(e) => handleInputChange('ntValidity', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Calendar className="icon" />
                    <b>TR Validity:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.trValidity}
                    onChange={(e) => handleInputChange('trValidity', e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Shield className="icon" />
                    <b>Last Endorse Auth:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.lastEndorseAuth}
                    onChange={(e) => handleInputChange('lastEndorseAuth', e.target.value)}
                    placeholder="Enter Last Endorse Authority"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="field-label">
                    <Phone className="icon" />
                    <b>Mobile Number:</b>
                  </label>
                </td>
                <td>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    placeholder="Enter Mobile Number"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="button-group no-print">
          <button onClick={handlePreview} className="btn btn-primary">
            <FileText className="btn-icon" />
            Preview
          </button>
          <button onClick={handlePrint} className="btn btn-secondary">
            <Printer className="btn-icon" />
            Print
          </button>
          <button onClick={() => window.print()} className="btn btn-secondary" style={{marginLeft: '10px'}}>
            <Printer className="btn-icon" />
            Print (Fallback)
          </button>
          <button onClick={handleExportPDF} className="btn btn-success">
            <Download className="btn-icon" />
            Export PDF
          </button>
          <button onClick={handleExportCSV} className="btn btn-warning">
            <FileText className="btn-icon" />
            Export CSV
          </button>
          <button onClick={clearForm} className="btn btn-danger">
            Clear Form
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="preview-modal-overlay">
          <div className="preview-modal">
            <div className="preview-header">
              <h2>DL Details Preview</h2>
              <button onClick={closePreview} className="close-btn">&times;</button>
            </div>
            
            <div className="preview-content">
              <div className="preview-document">
                {/* Header */}
                <div className="preview-header-section">
                  <div className="preview-title">DRIVING LICENSE</div>
                  <div className="preview-subtitle">Please check response is coming from</div>
                  <div className="preview-source">https://sarathi.parivahan.gov.in/...</div>
                </div>

                {/* Photo and Signature */}
                <div className="preview-images">
                  <div className="preview-photo">
                    {formData.candidateImage ? (
                      <img 
                        src={formData.candidateImage} 
                        alt="Candidate" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className="preview-placeholder" style={{ display: formData.candidateImage ? 'none' : 'flex' }}>
                      Photo
                    </div>
                  </div>
                  <div className="preview-signature">
                    {formData.candidateSignature ? (
                      <img 
                        src={formData.candidateSignature} 
                        alt="Signature" 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className="preview-placeholder" style={{ display: formData.candidateSignature ? 'none' : 'flex' }}>
                      Signature
                    </div>
                  </div>
                </div>

                {/* Form Data */}
                <div className="preview-form-data">
                  <div className="preview-row">
                    <div className="preview-label">DL No.:</div>
                    <div className="preview-value">{formData.dlNumber || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">D.O.B:</div>
                    <div className="preview-value">{formData.dob || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Name:</div>
                    <div className="preview-value">{formData.name || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">S/W/D:</div>
                    <div className="preview-value">{formData.fatherHusbandName || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Blood Group:</div>
                    <div className="preview-value">{formData.bloodGroup || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Nationality:</div>
                    <div className="preview-value">{formData.nationality || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Permanent Address:</div>
                    <div className="preview-value">{formData.permanentAddress || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Temporary Address:</div>
                    <div className="preview-value">{formData.temporaryAddress || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">COV:</div>
                    <div className="preview-value">{formData.cov || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Issue Date:</div>
                    <div className="preview-value">{formData.issueDate || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Gender:</div>
                    <div className="preview-value">{formData.gender || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Organ Donor:</div>
                    <div className="preview-value">{formData.organDonor || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Badge No:</div>
                    <div className="preview-value">{formData.badgeNo || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Badge Issue Date:</div>
                    <div className="preview-value">{formData.badgeIssueDate || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">NT Validity:</div>
                    <div className="preview-value">{formData.ntValidity || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">TR Validity:</div>
                    <div className="preview-value">{formData.trValidity || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Last Endorse Auth:</div>
                    <div className="preview-value">{formData.lastEndorseAuth || 'Not provided'}</div>
                  </div>
                  <div className="preview-row">
                    <div className="preview-label">Mobile Number:</div>
                    <div className="preview-value">{formData.mobileNumber || 'Not provided'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="preview-actions">
              <button onClick={handlePrintFromPreview} className="btn btn-primary">
                <Printer className="btn-icon" />
                Print
              </button>
              <button onClick={handleExportPDFFromPreview} className="btn btn-success">
                <Download className="btn-icon" />
                Export PDF
              </button>
              <button onClick={closePreview} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
