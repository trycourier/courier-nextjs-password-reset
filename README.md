![Next.js + Courier](https://www.courier.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fz7iqk1q8njt4%2F63jMY17H1Oi8YlzRQFWRut%2F2fd6d19434c556f77dd829e5aa19baad%2Fnextjs-courier.jpg&w=1920&q=75)

This is a [Next.js](https://nextjs.org/) project that is integrated with [Courier](https://courier.com/?utm_source=courier-nextjs-password-reset&utm_medium=code-template&utm_campaign=devrel-apps) and [Vercel KV](https://vercel.com).

Check-out [this deep dive](https://www.courier.com/blog/how-to-send-password-resets-via-sms-and-email-using-node-js-and-next-js/) into how this app was built for more details.

## Getting Started

Clone the repo and install dependencies:

```bash
npm install
```

## Prerequisites

In order to run this app, you'll need:

1. A free [Courier](https://courier.com/?utm_source=courier-nextjs-password-reset&utm_medium=code-template&utm_campaign=devrel-apps) account
2. A free [Vercel](https://vercel.com) account

## Configure Courier and Vercel accounts

Follow the instructions in this [companion blog post](https://www.courier.com/blog/how-to-send-password-resets-via-sms-and-email-using-node-js-and-next-js/) to:

- Retrieve your Courier API key
- Set-up email and SMS providers for Courier
- Set-up email and SMS notification templates
- Create a Vercel KV DB

Create a `.env.local` file at the root of the project to store secrets for Courier and Vercel.

```
COURIER_AUTH_TOKEN=pk_prod_xxx
COURIER_TEMPLATE=yyy
KV_URL="redis://default:12345@szzz.kv.vercel-storage.com:34698"
KV_REST_API_URL="https://zzz.kv.vercel-storage.com"
KV_REST_API_TOKEN="abcdef"
KV_REST_API_READ_ONLY_TOKEN="abcdef"
```

## Running the app

Open `http://localhost:3000` in your browser.

Click "Create User" to create a user whose password you want to test resetting.

Next, click "Forgot Password" and enter the email or phone number of the User that you just created.

## Deploy

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

To learn more about Courier, take a look at the following resources:

- [Sign-up](https://app.courier.com?utm_source=courier-nextjs-password-reset&utm_medium=code-template&utm_campaign=devrel-apps) - Sign up and get 10k messages/month for free.
- [Docs](https://courier.com/docs?utm_source=courier-nextjs-password-reset&utm_medium=code-template&utm_campaign=devrel-apps) - Platform and API reference docs
- [Integrations](https://courier.com/integrations?utm_source=courier-nextjs-password-reset&utm_medium=code-template&utm_campaign=devrel-apps) - Full list of SMS, email and eventing integrations.
- [Changelog](https://courier.com/changelog?utm_source=courier-nextjs-password-reset&utm_medium=code-template&utm_campaign=devrel-apps) - See what we've fixed and what we've shipped every week.