export interface ServiceOffering {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  description: string;
  symptoms: string[];
  deliverables: string[];
  idealClient: string;
  howItWorks: {
    step: string;
    title: string;
    description: string;
  }[];
  whatToExpect: {
    title: string;
    description: string;
  }[];
  seoTitle: string;
  seoDescription: string;
}

export const servicesData: ServiceOffering[] = [
  {
    id: 'web-funnels',
    slug: 'web-acquisition-funnels',
    title: 'Intelligent Websites & Lead Funnels',
    tagline: 'Turn your website into a 24/7 lead qualification machine.',
    shortDescription: 'We design and build custom websites that automatically greet, qualify, and route your incoming leads, sending clean data directly to your CRM.',
    description: 'Most business websites are static brochures. We build high-performance websites that act as active sales assistants—automatically greeting, screening, and sorting your leads so your sales team only spends time on high-value, ready-to-buy prospects.',
    symptoms: [
      'You are unsure which website leads are actually worth calling',
      'Hot prospects go cold because response times are slow or require manual checks',
      'Your sales team spends valuable hours manually copying and entering leads into your CRM',
      'Your website doesn’t connect smoothly with your sales and marketing tools',
    ],
    deliverables: [
      'A complete audit of how you capture and manage leads online',
      'Custom website forms that screen, score, and qualify incoming prospects',
      'Direct software integrations that send qualified leads straight to your CRM',
      'A fast, secure, modern website built for maximum lead conversion',
    ],
    idealClient: 'You want to stop chasing unqualified leads and turn your website into a self-running client acquisition pipeline.',
    howItWorks: [
      {
        step: '01',
        title: 'Analyze the Journey',
        description: 'We map how visitors find your site and locate the exact bottlenecks where high-value leads are dropping off.'
      },
      {
        step: '02',
        title: 'Design the Flow',
        description: 'We map out a simple, automated path to screen, score, and route leads without requiring manual effort.'
      },
      {
        step: '03',
        title: 'Build & Connect',
        description: 'We write clean, high-performance code to build your new site and link it directly to your existing sales tools.'
      }
    ],
    whatToExpect: [
      {
        title: 'Instant Lead Response',
        description: 'Prospects are greeted and qualified instantly, preventing hot leads from slipping away to competitors.'
      },
      {
        title: 'No More Manual Data Entry',
        description: 'Leads are automatically organized and stored in your systems, freeing up hours of manual administrative work.'
      },
      {
        title: 'Smarter Sales Conversations',
        description: 'Your sales team receives helpful background details on every lead before they even reach out.'
      }
    ],
    seoTitle: 'Intelligent Websites & Lead Funnels | Strohm Partners LLC',
    seoDescription: 'Transform your website into an automated lead generation engine. We design custom screening, qualification, and CRM sync systems to accelerate sales ROI.'
  },
  {
    id: 'content-systems',
    slug: 'content-voice-scaling',
    title: 'Smart Content Production Systems',
    tagline: 'Scale your content without losing your authentic brand voice.',
    shortDescription: 'We build custom workspaces and workflows that help you publish high-quality, on-brand content consistently across multiple platforms.',
    description: 'Consistently creating content is exhausting. We build custom brand templates and review pipelines that allow your team to turn raw ideas into polished newsletters, blog posts, and social updates in your exact brand voice, with a human editor always in control.',
    symptoms: [
      'Your creative staff spends more time formatting and copy-pasting than ideating and editing',
      'You want to use AI to speed up content creation but worry it will sound generic or off-brand',
      'Your posting schedule is inconsistent because it relies on manual, day-to-day effort',
      'Your content marketing efforts feel scattered and lack a defined operational system',
    ],
    deliverables: [
      'A custom brand voice playbook trained specifically on your writing style',
      'An easy-to-use editorial pipeline with clear human review steps',
      'Centralized workspaces designed to turn one draft into multiple platform posts',
      'Automated scheduling connections that publish directly to your core channels',
    ],
    idealClient: 'You want to build a strong online presence and publish premium content regularly without overloading your key subject matter experts.',
    howItWorks: [
      {
        step: '01',
        title: 'Capture Your Voice',
        description: 'We study your previous articles, emails, and documentation to map your unique tone, vocabulary, and style.'
      },
      {
        step: '02',
        title: 'Build the Pipeline',
        description: 'We set up a custom workspace where draft generation, formatting, and editor approvals happen in one place.'
      },
      {
        step: '03',
        title: 'Automate Publishing',
        description: 'We connect your workspace to your social channels and blogs for automated, scheduled distribution.'
      }
    ],
    whatToExpect: [
      {
        title: 'Authentic Tone at Scale',
        description: 'Your content sounds precisely like your team, completely free of robotic phrasing or generic AI clichés.'
      },
      {
        title: 'More Output, Less Effort',
        description: 'Multiply your publishing frequency across your newsletters and social media without hiring more marketing staff.'
      },
      {
        title: 'Faster Turnaround Times',
        description: 'Move from a rough raw concept to a scheduled, multi-platform campaign in hours instead of days.'
      }
    ],
    seoTitle: 'Smart Content Production Systems | Strohm Partners LLC',
    seoDescription: 'Scale your high-trust digital footprint. We build brand-aligned AI content systems with robust human-in-the-loop review pipelines.'
  },
  {
    id: 'operational-audits',
    slug: 'operational-audits',
    title: 'Workflow Automation & Integrations',
    tagline: 'Eliminate manual tasks and connect the tools you already use.',
    shortDescription: 'We audit your daily operations to find hidden bottlenecks, then build secure custom connections that automate onboarding, scheduling, and admin tasks.',
    description: 'Our core strategic service. We study how your team works every day to find repetitive, time-consuming tasks. Then, we build secure connections between your software tools, making your background operations run smoothly and automatically.',
    symptoms: [
      'Your staff spends hours moving, sorting, and verifying data across isolated business systems',
      'Client onboarding or project execution stalls due to manual administrative checklists',
      'Human error or missing steps occur because critical tasks rely on memory rather than code',
      'You lack structured visibility into which operational workflows are your biggest cost bottlenecks',
    ],
    deliverables: [
      'A deep diagnostic audit and visual map of your business operational bottlenecks',
      'Automated document tools to extract and sort information from PDFs and forms',
      'Secure, custom software connections (APIs) linking your backend applications',
      'Simple dashboards to track time saved, workflow speed, and active ROI',
    ],
    idealClient: 'You want to scale your firm’s operational capacity and increase profit margins without adding linear overhead or sacrificing work quality.',
    howItWorks: [
      {
        step: '01',
        title: 'Shadow Operations',
        description: 'We review your team’s daily routines and record time expenditures to locate the exact spots where time is being lost.'
      },
      {
        step: '02',
        title: 'Map the Solutions',
        description: 'We outline the exact integration paths needed to link your isolated software tools together into one system.'
      },
      {
        step: '03',
        title: 'Deploy Automation',
        description: 'We build secure, custom database connections and automated routines that handle manual tasks in the background.'
      }
    ],
    whatToExpect: [
      {
        title: 'Hours Reclaimed Weekly',
        description: 'Reclaim 10 to 30 hours per employee every single week by automating routine administrative tasks and data entry.'
      },
      {
        title: 'Near-Zero Data Errors',
        description: 'Eliminate human typos, lost files, and skipped steps through robust, structured data automation scripts.'
      },
      {
        title: 'Linear Operational Scaling',
        description: 'Double your active client volume and pipeline throughput without having to double your operational back-office staff.'
      }
    ],
    seoTitle: 'Workflow Automation & Integrations | Strohm Partners LLC',
    seoDescription: 'Identify and automate operational bottlenecks. We conduct diagnostic audits and build custom API and backend AI integrations.'
  },
  {
    id: 'aeo-geo-playbook',
    slug: 'aeo-geo-playbook',
    title: 'AI Search Optimization (AEO/GEO)',
    tagline: 'Get your business recommended first by AI search engines.',
    shortDescription: 'We optimize your brand’s digital presence so conversational AI engines like ChatGPT, Gemini, and Perplexity recommend you for high-intent queries.',
    description: 'More people are asking AI search engines for recommendations instead of scrolling through traditional Google links. We audit and organize your online information so conversational AI models easily understand, trust, and recommend your business as the top choice in your industry.',
    symptoms: [
      'AI search engines recommend your competitors or omit your brand entirely for high-intent queries',
      'You have premium content but lack the structured format conversational search tools look for',
      'You are losing website traffic as users get direct answers inside AI search interfaces',
      'You lack a clear strategy to keep your brand visible as online search transitions to AI systems',
    ],
    deliverables: [
      'A full diagnostic report of your brand’s current visibility in major AI search engines',
      'Optimized backend data and tags so conversational AI engines can easily read your site',
      'Content updates structured to match how conversational search tools pull and verify information',
      'An active tracking dashboard showing where and how often AI recommends your business',
    ],
    idealClient: 'You want to secure early dominance in AI search rankings and ensure your brand is recommended first when clients ask ChatGPT, Gemini, or Perplexity for solutions.',
    howItWorks: [
      {
        step: '01',
        title: 'Diagnostic Scan',
        description: 'We query leading AI search engines to see if they recommend you, how they view you, and where your footprint is weak.'
      },
      {
        step: '02',
        title: 'Organize Brand Data',
        description: 'We deploy backend structural tags and clean data linkages across your site so AI engines can easily read and verify your info.'
      },
      {
        step: '03',
        title: 'Polish Content',
        description: 'We structure and write your key content to directly match how conversational search engines retrieve and cite information.'
      }
    ],
    whatToExpect: [
      {
        title: 'Top AI Recommendations',
        description: 'Appear as a trusted recommendation when users ask ChatGPT, Gemini, or Perplexity for solutions in your niche.'
      },
      {
        title: 'Rich Citation Cards',
        description: 'Get listed directly in clickable citation boxes and source cards inside conversational AI search interfaces.'
      },
      {
        title: 'High-Intent Lead Inflow',
        description: 'Capture highly qualified, ready-to-buy clients who rely entirely on conversational search for their purchasing decisions.'
      }
    ],
    seoTitle: 'AI Search Optimization (AEO/GEO) | Strohm Partners LLC',
    seoDescription: 'Rank your business in ChatGPT, Gemini, and Perplexity answers. We deploy semantic graph schemas and retrieval-optimized AEO frameworks.'
  },
  {
    id: 'ai-chatbots',
    slug: 'ai-chatbots',
    title: 'AI Chatbots & Conversational Assistants',
    tagline: 'Deploy intelligent chatbots that qualify leads and support customers around the clock.',
    shortDescription: 'We design and build custom AI chatbots that engage visitors, answer questions, qualify prospects, and route conversations to your team—all without human intervention.',
    description: 'Most live chat tools are either too dumb to help or too expensive to staff. We build custom AI chatbots trained on your brand voice, knowledge base, and business rules—so every visitor gets instant, intelligent conversations that drive revenue and reduce support load.',
    symptoms: [
      'Your website visitors leave without engaging because there is no one available to answer questions in real time',
      'Your support team is overwhelmed with repetitive, low-value inquiries that could be handled automatically',
      'Leads go cold after hours because no one is available to respond outside of business hours',
      'Your current chatbot feels robotic, gives wrong answers, or frustrates users instead of helping them',
    ],
    deliverables: [
      'A custom AI chatbot trained on your specific business knowledge, FAQs, and brand voice',
      'Intelligent conversation flows that qualify leads and route high-value prospects to your sales team',
      'Seamless integration with your CRM, helpdesk, and messaging platforms',
      'Analytics dashboard tracking conversations, lead quality, and resolution rates',
    ],
    idealClient: 'You want to provide instant, intelligent customer engagement 24/7 without scaling your support headcount or sacrificing conversation quality.',
    howItWorks: [
      {
        step: '01',
        title: 'Map Conversations',
        description: 'We audit your most common customer inquiries, sales conversations, and support tickets to design intelligent dialogue flows.'
      },
      {
        step: '02',
        title: 'Train & Build',
        description: 'We train your chatbot on your knowledge base, brand voice, and business rules, then build custom conversation interfaces.'
      },
      {
        step: '03',
        title: 'Deploy & Optimize',
        description: 'We launch your chatbot across your website and channels, then continuously refine responses based on real conversation data.'
      }
    ],
    whatToExpect: [
      {
        title: '24/7 Intelligent Engagement',
        description: 'Every visitor receives instant, helpful responses regardless of time zone or business hours, capturing leads that would otherwise be lost.'
      },
      {
        title: 'Qualified Lead Pipeline',
        description: 'Your chatbot automatically screens, scores, and routes the highest-value prospects directly to your sales team with full conversation context.'
      },
      {
        title: 'Reduced Support Burden',
        description: 'Deflect up to 70% of repetitive support tickets while your human agents focus on complex, high-value customer interactions.'
      }
    ],
    seoTitle: 'AI Chatbots & Conversational Assistants | Strohm Partners LLC',
    seoDescription: 'Deploy custom AI chatbots that qualify leads, answer questions, and support customers 24/7. We build intelligent conversational assistants trained on your brand.'
  },
  {
    id: 'ai-voice-agents',
    slug: 'ai-voice-agents',
    title: 'AI Voice Agents & Phone Automation',
    tagline: 'Never miss a call again with AI voice agents that sound like your best employee.',
    shortDescription: 'We build custom AI voice agents that answer calls, book appointments, qualify callers, and handle routine phone conversations with natural, human-like speech.',
    description: 'Missed calls are missed revenue. We build AI voice agents that answer every call instantly, handle scheduling and qualification conversations, and escalate complex issues to your team—all with natural speech that callers trust and engage with.',
    symptoms: [
      'You are missing inbound calls because your front desk or sales team cannot handle the volume',
      'After-hours callers reach voicemail and never call back, taking their business to competitors',
      'Your staff spends excessive time on routine scheduling and qualification calls instead of high-value work',
      'Your current phone system lacks intelligence—callers get stuck in menus or on hold with no resolution',
    ],
    deliverables: [
      'A custom AI voice agent trained on your business scripts, FAQs, and appointment scheduling rules',
      'Natural speech synthesis and recognition configured to match your brand tone and caller expectations',
      'Direct integration with your calendar, CRM, and phone systems for real-time booking and data capture',
      'Call analytics and transcription dashboard showing call outcomes, lead quality, and resolution metrics',
    ],
    idealClient: 'You want to capture every inbound call as a revenue opportunity and automate routine phone conversations without hiring additional receptionists or sales development reps.',
    howItWorks: [
      {
        step: '01',
        title: 'Script the Calls',
        description: 'We study your most common call types and map out conversation trees for scheduling, qualification, and support scenarios.'
      },
      {
        step: '02',
        title: 'Build the Voice',
        description: 'We configure natural speech synthesis and recognition, training the agent on your scripts, tone, and business-specific vocabulary.'
      },
      {
        step: '03',
        title: 'Connect & Launch',
        description: 'We integrate the voice agent with your phone system, calendar, and CRM, then launch with live monitoring and continuous optimization.'
      }
    ],
    whatToExpect: [
      {
        title: 'Every Call Answered',
        description: 'Capture 100% of inbound calls with zero hold time, converting missed calls and after-hours inquiries into booked appointments and qualified leads.'
      },
      {
        title: 'Natural Caller Experience',
        description: 'Your AI voice agent handles conversations with human-like speech and contextual understanding, building caller trust and engagement.'
      },
      {
        title: 'Scalable Phone Operations',
        description: 'Handle unlimited simultaneous calls without adding headcount, scaling your phone capacity instantly during peak demand or growth periods.'
      }
    ],
    seoTitle: 'AI Voice Agents & Phone Automation | Strohm Partners LLC',
    seoDescription: 'Build custom AI voice agents that answer calls, book appointments, and qualify leads 24/7. Natural speech automation for inbound phone operations.'
  }
];
