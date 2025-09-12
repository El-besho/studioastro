# Environment Setup Guide

## Quick Start

1. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env` file according to your needs

3. Start the development server:
   ```bash
   npm run dev
   ```

## Required Environment Variables

### Essential Variables
- `SITE_URL`: Your website URL (e.g., https://enqaz.org)
- `CONTACT_PHONE`: Main contact phone number
- `CONTACT_EMAIL`: Main contact email
- `CONTACT_WHATSAPP`: WhatsApp contact number

### Optional Variables

#### Google Services
- `GOOGLE_ANALYTICS_ID`: For website analytics
- `GOOGLE_SEARCH_CONSOLE_VERIFICATION`: For Search Console verification
- `GOOGLE_MAPS_API_KEY`: For maps integration

#### Social Media
- `TWITTER_URL`: Twitter profile URL
- `FACEBOOK_URL`: Facebook page URL
- `INSTAGRAM_URL`: Instagram profile URL
- `LINKEDIN_URL`: LinkedIn company page URL

#### AI Services (Future Features)
- `GOOGLE_AI_API_KEY`: For AI-powered features
- `OPENAI_API_KEY`: For OpenAI integration

#### Email Service
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password

#### Security
- `JWT_SECRET`: Secret key for JWT tokens
- `ENCRYPTION_KEY`: Key for data encryption

## Development vs Production

### Development
```bash
NODE_ENV=development
PORT=9002
VITE_APP_DEBUG=true
```

### Production
```bash
NODE_ENV=production
VITE_APP_DEBUG=false
```

## Deployment

### Vercel
1. Set environment variables in Vercel dashboard
2. Deploy using: `npm run deploy`

### Netlify
1. Set environment variables in Netlify dashboard
2. Connect your repository for automatic deployments

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique secrets for production
- Regularly rotate API keys and tokens
- Use environment-specific configurations

## Troubleshooting

### Common Issues

1. **Build Errors**: Check if all required environment variables are set
2. **API Errors**: Verify API keys and endpoints
3. **Image Loading**: Ensure image paths are correct
4. **Contact Form**: Check SMTP configuration

### Support

For issues related to environment setup, please check:
- [Astro Documentation](https://docs.astro.build/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- Project documentation in `/docs` folder