export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: '5-tasks-to-automate-this-week',
    title: '5 Tasks Every Small Business Should Automate This Week',
    date: '2026-06-03',
    excerpt: "If you're running a small business, you're probably doing at least a few things manually that could be automated in under an hour.",
    tags: ['automation', 'productivity', 'small-business'],
    author: 'Josh Strohm',
    content: `
If you're running a small business, you're probably doing at least a few things manually that could be automated in under an hour. Here are five tasks you can automate this week — no coding required.

## 1. Email Follow-ups

How much time do you spend copying and pasting the same follow-up emails? Tools like Mailchimp, ActiveCampaign, or even Gmail templates can automate this entirely.

**Time saved:** 3-5 hours per week

## 2. Invoice Generation

If you're still creating invoices manually in Word or Excel, stop. Tools like FreshBooks, Wave, or QuickBooks can auto-generate invoices from your project data.

**Time saved:** 2-4 hours per week

## 3. Social Media Posting

Posting to social media doesn't need to be a daily chore. Buffer, Hootsuite, or even native scheduling tools let you batch-create a week's worth of content in one sitting.

**Time saved:** 5-7 hours per week

## 4. Appointment Scheduling

Stop the back-and-forth emails trying to find meeting times. Calendly, Cal.com, or SavvyCal let people book directly on your calendar.

**Time saved:** 2-3 hours per week

## 5. Data Entry

If you're copying data between systems, Zapier or Make can connect your tools and automate the transfer entirely.

**Time saved:** 4-8 hours per week

---

**Total potential time saved: 16-27 hours per week**

That's not a typo. Most small businesses can reclaim 2-3 full workdays per week just by automating these five areas. The best part? Most of these tools have free tiers or cost less than $20/month.
    `
  },
  {
    slug: 'why-small-businesses-need-ai',
    title: 'Why Small Businesses Need AI (And Why It\'s More Affordable Than You Think)',
    date: '2026-06-01',
    excerpt: "AI isn't just for tech giants anymore. Here's why small businesses that ignore AI will get left behind — and why it's more accessible than ever.",
    tags: ['ai', 'small-business', 'strategy'],
    author: 'Josh Strohm',
    content: `
There's a common misconception that artificial intelligence is only for Fortune 500 companies with massive tech budgets. That was true five years ago. It's not anymore.

## The Playing Field Has Changed

Today, AI tools are:
- **Cheaper** — many start free or under $50/month
- **Easier to use** — no coding required
- **More powerful** — capable of complex reasoning and automation

Small businesses that adopt AI now will have a massive competitive advantage over those that wait.

## Where Small Businesses Are Using AI

Here are real examples of how small businesses are using AI today:

**Customer Service**
AI chatbots handle 80% of routine customer questions, freeing up your team for complex issues.

**Content Creation**
Blog posts, social media, email newsletters — AI can draft content in minutes instead of hours.

**Data Analysis**
AI can spot patterns in your sales data that would take a human weeks to find.

**Scheduling & Coordination**
AI assistants can manage calendars, schedule meetings, and coordinate teams automatically.

## The Cost of Doing Nothing

Every day you wait to adopt AI, your competitors aren't. They're:
- Responding to leads faster
- Creating more content
- Serving customers better
- Making data-driven decisions

The question isn't whether you can afford AI. It's whether you can afford to not use it.

## Getting Started

You don't need to overhaul your entire business. Start with one process:
1. Identify your biggest time sink
2. Find an AI tool that addresses it
3. Test it for 2 weeks
4. Measure the results

That's it. Small steps lead to big changes.
    `
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
