This is a [Next.js](https://nextjs.org/) project that is integrated with [Courier](https://courier.com).

## Prerequisites

In order to run this app, you'll need:

1. A [Courier](https://courier.com/?utm_source=courier-nextjs-password-reset&utm_medium=code-template&utm_campaign=devrel-apps) account
2. A [Vercel](https://vercel.com) account

## Getting Started

Clone the repo and install dependencies:

```bash
npm install
```

Create a `.env.local` file at the root of the project to store secrets for Courier and Vercel.

## Courier Set-up

Log-in to Dashboard

Copy and paste your API key into `.env.local`:

```
COURIER_AUTH_TOKEN=pk_XXX
```

Set-up an SMS provider

Set-up an Email provider


## Vercel Set-up

Create a new KV store

Copy and paste credentials into `.env.local`:

```
KV_URL=redis://default:YYY@smart-adder-ZZZ.kv.vercel-storage.com:34698
KV_REST_API_URL=https://smart-adder-ZZZ.kv.vercel-storage.com
KV_REST_API_TOKEN=XXX
KV_REST_API_READ_ONLY_TOKEN=YYY
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