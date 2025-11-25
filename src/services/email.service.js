/**
 * Email Notification Service
 *
 * In a production environment, this would integrate with:
 * - SendGrid API
 * - AWS SES (Simple Email Service)
 * - Mailgun
 * - Or a backend API that handles email sending
 *
 * For now, this logs emails to console and could be extended
 * with actual API calls.
 */

class EmailService {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_EMAIL_API_ENDPOINT || null;
  }

  async sendOrderConfirmation(order, userEmail) {
    const emailData = {
      to: userEmail,
      subject: `Order Confirmation #${order.id}`,
      body: this.generateOrderConfirmationEmail(order)
    };

    return this.sendEmail(emailData);
  }

  async sendWelcomeEmail(userName, userEmail) {
    const emailData = {
      to: userEmail,
      subject: 'Welcome to Our Shop!',
      body: this.generateWelcomeEmail(userName)
    };

    return this.sendEmail(emailData);
  }

  async sendOrderShippedNotification(order, userEmail, trackingNumber) {
    const emailData = {
      to: userEmail,
      subject: `Your Order #${order.id} Has Shipped!`,
      body: this.generateShippingEmail(order, trackingNumber)
    };

    return this.sendEmail(emailData);
  }

  async sendPasswordResetEmail(userEmail, resetLink) {
    const emailData = {
      to: userEmail,
      subject: 'Password Reset Request',
      body: this.generatePasswordResetEmail(resetLink)
    };

    return this.sendEmail(emailData);
  }

  async sendEmail(emailData) {
    // In development, log to console
    if (process.env.NODE_ENV === 'development' || !this.apiEndpoint) {
      console.log('📧 Email would be sent:', emailData);
      return Promise.resolve({ success: true, message: 'Email logged (dev mode)' });
    }

    // In production, send actual email via API
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  generateOrderConfirmationEmail(order) {
    return `
      <h2>Thank you for your order!</h2>
      <p>Order ID: #${order.id}</p>
      <p>Order Date: ${new Date(order.date).toLocaleDateString()}</p>

      <h3>Order Items:</h3>
      <ul>
        ${order.items.map(item => `
          <li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
        `).join('')}
      </ul>

      <h3>Total: $${order.total.toFixed(2)}</h3>

      <p>You will receive a shipping confirmation email when your order ships.</p>
      <p>Thank you for shopping with us!</p>
    `;
  }

  generateWelcomeEmail(userName) {
    return `
      <h2>Welcome to Our Shop, ${userName}!</h2>
      <p>Thank you for creating an account with us.</p>
      <p>Start exploring our collection and enjoy exclusive member benefits:</p>
      <ul>
        <li>Early access to sales</li>
        <li>Special member-only discounts</li>
        <li>Order tracking and history</li>
        <li>Wishlist management</li>
      </ul>
      <p>Happy shopping!</p>
    `;
  }

  generateShippingEmail(order, trackingNumber) {
    return `
      <h2>Your order has shipped!</h2>
      <p>Order ID: #${order.id}</p>
      <p>Tracking Number: ${trackingNumber}</p>

      <h3>Shipped Items:</h3>
      <ul>
        ${order.items.map(item => `
          <li>${item.name} x ${item.quantity}</li>
        `).join('')}
      </ul>

      <p>You can track your package using the tracking number above.</p>
      <p>Expected delivery: 3-5 business days</p>
    `;
  }

  generatePasswordResetEmail(resetLink) {
    return `
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your password.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 24 hours.</p>
    `;
  }
}

export default new EmailService();
