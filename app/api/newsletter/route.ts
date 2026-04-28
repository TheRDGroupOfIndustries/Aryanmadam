// app/api/newsletter/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

async function sendWelcomeEmail(email: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER?.trim(),
        pass: process.env.EMAIL_PASS?.replace(/\s/g, '').trim(),
      },
    });

    const mailOptions = {
      from: `"Arya Madam Craft Supplies" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Our Creative Community! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaeb; border-radius: 10px;">
          <div style="text-align: center;">
            <img src="https://raw.githubusercontent.com/sujitkumar-13/Aryanmadam/main/public/assets/logo6.png" alt="Arya Madam Craft Supplies Logo" style="max-height: 80px; width: auto; object-fit: contain;">
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px 30px 30px; border-radius: 8px; text-align: center;">
            <h2 style="color: #333; margin-top: 0; margin-bottom: 15px;">Welcome to Our Community! 🎨</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for subscribing to the Arya Madam Craft Supplies newsletter! We're thrilled to have you join our creative family.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              You'll now be the first to know about our latest collections, exclusive offers, craft tips, and creative inspiration.
            </p>
            
            <a href="https://aryamadamcraft.com/shop" style="display: inline-block; background-color: #E76F51; color: white; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Start Exploring
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #888; font-size: 12px; margin-bottom: 5px;">
              © ${new Date().getFullYear()} Arya Madam Craft Supplies. All rights reserved.
            </p>
            <p style="color: #888; font-size: 12px;">
              Gali No: 1 Rudra Colony, Bhiwani, Haryana - 127021
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (emailError) {
    console.error('❌ Failed to send welcome email:', emailError);
    return false;
  }
}

async function sendAdminNotification(name: string, email: string, phone: string, requirement: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER?.trim(),
        pass: process.env.EMAIL_PASS?.replace(/\s/g, '').trim(),
      },
    });

    await transporter.sendMail({
      from: `"Arya Madam Website" <${process.env.EMAIL_USER}>`,
      to: 'aryamadamcraftsupplies@gmail.com',
      replyTo: email,
      subject: `New Popup Subscriber: ${name || email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e6cfa7; border-radius: 12px;">
          <h2 style="color: #2c5f7c; border-bottom: 2px solid #e6cfa7; padding-bottom: 10px;">
            New Discount Popup Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555; width: 130px;">Name:</td>
              <td style="padding: 10px; color: #111;">${name || 'Not provided'}</td>
            </tr>
            <tr style="background: #fdfaf6;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px; color: #111;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 10px; color: #111;">${phone || 'Not provided'}</td>
            </tr>
            <tr style="background: #fdfaf6;">
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Requirement:</td>
              <td style="padding: 10px; color: #111; white-space: pre-wrap;">${requirement || 'Not provided'}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #999; text-align: center;">
            Submitted via discount popup on aryamadamcraftsupplies.com
          </p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error('❌ Failed to send admin notification:', err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, requirement } = await request.json();

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (phone && !phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number. Please enter 10-15 digits.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscriber) {
      // Update existing subscriber with new info if provided
      await (prisma.newsletter as any).update({
        where: { email: email.toLowerCase() },
        data: {
          name: name || (existingSubscriber as any).name,
          phone: phone || (existingSubscriber as any).phone,
          requirement: requirement || (existingSubscriber as any).requirement,
        },
      });

      await sendWelcomeEmail(email);
      await sendAdminNotification(name, email, phone, requirement);

      return NextResponse.json(
        { message: 'Your information has been updated and you are already subscribed!' },
        { status: 200 }
      );
    }

    // Create new subscriber
    const newSubscriber = await (prisma.newsletter as any).create({
      data: {
        email: email.toLowerCase(),
        name,
        phone,
        requirement,
      },
    });

    await sendWelcomeEmail(newSubscriber.email);
    await sendAdminNotification(name, newSubscriber.email, phone, requirement);

    return NextResponse.json(
      {
        message: '✅ Successfully subscribed to our newsletter!',
        subscriber: {
          id: newSubscriber.id,
          email: newSubscriber.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

// Optional: GET route to check subscription status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    return NextResponse.json({
      subscribed: !!subscriber,
      email: email.toLowerCase(),
    });
  } catch (error) {
    console.error('Newsletter check error:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    );
  }
}