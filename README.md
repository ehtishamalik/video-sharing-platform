# Video Sharing Platform

A modern web application for sharing, discovering, and interacting with video content.

## Overview

This project implements a feature-rich video sharing platform that allows users to upload, view, like, comment on, and share videos. The platform includes user authentication, personalized recommendations, and a responsive interface for optimal viewing across devices.

## Features

- **Screen recording and sharing** - Capture and share your screen directly within the platform
- User authentication and profile management
- Video upload and management
- Video playback with customizable player
- Comments and reactions
- Content discovery and recommendations
- Responsive design for mobile and desktop
- Search functionality

## Technologies Used

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Next.js
- **Database**: PostgresQL via NeonDB
- **Authentication**: Google OAuth
- **Video Processing**: ImageKit.io
- **Storage**: ImageKit.io
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- PostgresQL
- ImageKit.io
- Vercel account (for deployment)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/video-sharing-platform.git
cd video-sharing-platform
```

2. Install dependencies:

```bash
yarn install
```

4. Set up environment variables:

- Create `.env` files in both frontend and backend directories
- Configure necessary API keys, database connections

Example `.env` variables needed:

```env
# Database Configuration
DATABASE_URL=your_neondb_postgres_connection_string

# Authentication
BETTER_AUTH_SECRET=your_nextauth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000 (same as BETTER_AUTH_URL)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ImageKit Configuration
IMAGEKIT_URL=your_imagekit_url_endpoint
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Make sure these variables are properly set before starting the application.

5. Start the development servers:

```bash
yarn dev
```

## Usage

1. Register for an account or log in
2. Browse videos on the homepage
3. Upload your own videos using the upload button
4. Interact with videos by liking, commenting, and sharing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Imagekit.io](https://imagekit.io/) for video processing
- [NeonDB](https://neon.com/) for database solutions
- [NextJS](https://nextjs.org/) for the framework
