# FTAI Smart Inventory Management System

A modern React-based inventory management system with Google Sheets backend integration and AI-powered insights using OpenAI.

## Features

- 📊 **Real-time Dashboard**: Live inventory statistics and overview
- 📋 **Google Sheets Integration**: Use Google Sheets as your database
- 🤖 **AI Assistant**: Chat with your inventory data using OpenAI
- 🔍 **Advanced Search & Filtering**: Find items quickly with powerful search
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v16 or higher)
- npm or yarn
- Google Sheets API key
- OpenAI API key
- A Google Sheets spreadsheet with inventory data

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd User_interface_React
npm install
```

### 2. Google Sheets Setup

#### Step 1: Create a Google Sheets Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name the first sheet "Inventory" (or update the sheet name in the code)
4. Add your inventory data with headers in the first row

#### Step 2: Get Google Sheets API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key

#### Step 3: Make Your Spreadsheet Public
1. In your Google Sheets, click "Share" (top right)
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

### 3. OpenAI Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to "API Keys" section
4. Create a new API key
5. Copy the API key

### 4. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your API keys:
   ```env
   VITE_GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
   VITE_SPREADSHEET_ID=your_spreadsheet_id_here
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

### 5. Google Sheets Data Format

Your Google Sheets should have the following columns (headers in first row):

| Column | Description | Example |
|--------|-------------|---------|
| SKU | Stock Keeping Unit | ABC123 |
| Name | Item name | Laptop Dell XPS 13 |
| Category | Item category | Electronics |
| Quantity | Current stock level | 25 |
| MinQuantity | Minimum stock level | 5 |
| MaxQuantity | Maximum stock level | 100 |
| Unit | Unit of measurement | pcs |
| Location | Warehouse location | Warehouse A |
| Supplier | Supplier name | Dell Inc |
| LastUpdated | Last update date | 2024-03-18 |
| Status | Item status | Active |

**Note**: The system is flexible and will try to match column names. You can use variations like:
- SKU/ItemCode
- Name/ItemName/Description
- Quantity/Stock/Qty
- MinQuantity/Minimum/ReorderPoint
- MaxQuantity/Maximum
- Unit/UOM
- Location/Warehouse
- Supplier/Vendor
- LastUpdated/Updated
- Status

### 6. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Dashboard Overview
- View real-time inventory statistics
- See low stock alerts
- Monitor category distribution

### Inventory Data Tab
- Browse all inventory items
- Search and filter items
- Sort by any column
- View stock status indicators

### AI Assistant Tab
- Chat with your inventory data
- Ask questions about stock levels
- Get AI-powered insights
- Use quick prompts for common queries

## API Endpoints

The application uses the following APIs:

### Google Sheets API
- **Endpoint**: `https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}`
- **Method**: GET
- **Authentication**: API Key

### OpenAI API
- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Method**: POST
- **Authentication**: Bearer Token

## Troubleshooting

### Common Issues

1. **"Google Sheets API key not configured"**
   - Check that `VITE_GOOGLE_SHEETS_API_KEY` is set in your `.env` file
   - Ensure the API key is valid and has access to Google Sheets API

2. **"Spreadsheet ID not configured"**
   - Verify `VITE_SPREADSHEET_ID` is set correctly
   - Make sure the spreadsheet is publicly accessible

3. **"OpenAI API key not configured"**
   - Check that `VITE_OPENAI_API_KEY` is set in your `.env` file
   - Ensure you have sufficient OpenAI credits

4. **"No data found"**
   - Verify your Google Sheets has data in the correct format
   - Check that the sheet name matches "Inventory" (or update the code)
   - Ensure the first row contains headers

5. **CORS Issues**
   - The application uses client-side API calls
   - Ensure your Google Sheets is publicly accessible
   - Check that your API keys are valid

### Data Format Issues

If your data isn't displaying correctly:

1. Check that your Google Sheets has headers in the first row
2. Ensure column names match the expected format
3. Verify that numeric fields (Quantity, MinQuantity, MaxQuantity) contain numbers
4. Make sure there are no empty rows at the top

## Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure
- Consider using environment-specific API keys for production
- The Google Sheets should be read-only for public access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the troubleshooting section above
- Review the Google Sheets API documentation
- Check the OpenAI API documentation
- Open an issue in the repository 