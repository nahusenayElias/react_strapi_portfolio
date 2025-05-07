export default ({ env }) => ({
    // Email plugin configuration
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.example.com'), // Default fallback value
          port: env.int('SMTP_PORT', 587),
          secure: env.bool('SMTP_SECURE', false), // True for 465, false for other ports
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          // Uncomment for Gmail/Office365:
          // tls: {
          //   rejectUnauthorized: env.bool('SMTP_REJECT_UNAUTHORIZED', true),
          // },
        },
        settings: {
          defaultFrom: env('EMAIL_DEFAULT_FROM', 'no-reply@yourdomain.com'),
          defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'contact@yourdomain.com'),
        },
      },
    },

    // Optional: Add other plugins configuration here
    // ...
  });


  module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    // ...
  });