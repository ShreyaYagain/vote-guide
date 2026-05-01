"use client";
import { useCountry } from "@/hooks/useCountry";
import StepTracker from "@/components/journey/StepTracker";
import { Share2, Calendar, MapPin, Info, ArrowRight } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useCountdown } from "@/hooks/useCountdown";
import { parseISO, differenceInDays } from "date-fns";

const steps = [
  {
    id: 1,
    label: 'Check eligibility',
    date: '2026-03-01',
    description: 'Confirm you meet age and residency requirements.',
    instructions: [
      'You must be 18 or older on the date of polling',
      'You must be an Indian citizen',
      'You must be ordinarily resident in the constituency where you want to vote',
    ],
    url: 'https://voters.eci.gov.in',
    done_by_default: false
  },
  {
    id: 2,
    label: 'Register to vote',
    date: '2026-03-15',
    description: 'Submit your voter registration via NVSP portal.',
    instructions: [
      'Visit voters.eci.gov.in or download the Voter Helpline App',
      'Fill Form 6 with your name, address, date of birth and upload a photo',
      'Submit Aadhaar or any valid address proof as supporting document',
      'Track your application status on the same portal',
    ],
    url: 'https://voters.eci.gov.in',
    done_by_default: false
  },
  {
    id: 3,
    label: 'Get your Voter ID (EPIC)',
    date: '2026-04-01',
    description: 'Download or collect your Electors Photo Identity Card.',
    instructions: [
      'Download your e-EPIC (digital voter ID) from voters.eci.gov.in for free',
      'Physical EPIC cards are delivered by post to your registered address',
      'If lost, apply for a duplicate using Form 002 on the NVSP portal',
      'Aadhaar, passport, or driving licence are accepted as alternatives on polling day',
    ],
    url: 'https://voters.eci.gov.in/download-eepic',
    done_by_default: false
  },
  {
    id: 4,
    label: 'Find your polling station',
    date: '2026-04-20',
    description: 'Locate your assigned booth before polling day.',
    instructions: [
      'Go to electoralsearch.eci.gov.in and enter your details',
      'Your booth address and booth number will be shown',
      'Note the booth address and plan your route in advance',
      'Polling stations are typically within 2km of your registered address',
    ],
    url: 'https://electoralsearch.eci.gov.in',
    done_by_default: false
  },
  {
    id: 5,
    label: 'Cast your vote',
    date: '2026-04-26',
    description: 'Go to your polling booth and vote on polling day.',
    instructions: [
      'Carry your Voter ID (EPIC) or any of the 12 approved alternate photo IDs',
      'Polling booths are open 7am to 6pm — go early to avoid queues',
      'Press the blue button next to your chosen candidate on the EVM',
      'You will receive a VVPAT slip confirming your vote — verify it',
      'Voting is secret — no one can see who you voted for',
    ],
    url: 'https://eci.gov.in/voter-registration/faqs/',
    done_by_default: false
  },
  {
    id: 6,
    label: 'Track results',
    date: '2026-06-04',
    description: 'Follow the vote count live on results day.',
    instructions: [
      'Results are declared on June 4, 2026 — counting starts at 8am',
      'Follow live results at results.eci.gov.in',
      'Your constituency result will show which candidate won your seat',
      'The party with majority in Lok Sabha (272+ seats) forms the government',
    ],
    url: 'https://results.eci.gov.in',
    done_by_default: false
  },
];

export default function JourneyPage() {
  const { countryData, loading } = useCountry();
  const { selectedState } = useUserStore();

  const pollingDate = countryData?.phases.find(p => p.states.includes(selectedState || "Karnataka"))?.date || "2026-04-26";
  const { days, isExpired } = useCountdown(pollingDate);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }


  // Format polling date to something like "April 26, 2026"
  const formattedPollingDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(parseISO(pollingDate));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-black text-navy">My Election Journey</h1>
          <div className="flex items-center gap-3 text-sm font-medium text-secondary">
             <span className="flex items-center gap-1"><MapPin size={14} className="text-primary" /> {selectedState}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-cream-border" />
             <span className="flex items-center gap-1"><Info size={14} className="text-primary" /> Phase {countryData?.phases.find(p => p.states.includes(selectedState || "Karnataka"))?.phase || 2}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-cream-border" />
             <span className="flex items-center gap-1"><Calendar size={14} className="text-primary" /> {formattedPollingDate}</span>
          </div>
        </div>
        <button className="btn-navy-outline py-2.5">
          <Share2 size={16} />
          Share Journey
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Step Tracker */}
        <div className="lg:col-span-2 space-y-8">
           <div className="card-heritage p-0 overflow-hidden border-2 border-gold/10">
              <div className="bg-cream-dark/30 p-6 border-b border-cream-border flex justify-between items-center">
                 <h3 className="font-heading font-bold text-navy uppercase tracking-widest text-sm">Required Steps</h3>
                 <span className="text-[10px] font-bold text-secondary">Updated: Today</span>
              </div>
              <div className="p-8">
                <StepTracker steps={steps} />
              </div>
           </div>
        </div>

        {/* Timeline Panel */}
        <div className="space-y-8 sticky top-24">
           <div className="card-heritage border-2 border-gold/10">
              <div className="arch-frame h-12 bg-primary/10 flex items-center justify-center -mt-6 -mx-6 mb-6 overflow-hidden scalloped-top">
                 <h4 className="font-heading font-bold text-navy text-sm uppercase tracking-widest">Your Timeline</h4>
              </div>
              
              <div className="space-y-6 relative py-4">
                 <TimelineItem date="Mar 15" label="Registration Deadline" status="pending" />
                 <TimelineItem date="Apr 26" label="Polling Day" status="active" />
                 <TimelineItem date="Jun 04" label="Results Day" status="pending" />
              </div>

              <div className="mt-8 p-4 rounded-lg bg-cream-dark/50 border border-cream-border text-center">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Countdown to Polling Day</p>
                 <div className="flex justify-center gap-2">
                    <div className="text-2xl font-mono font-bold text-navy">{isExpired ? "0" : days}</div>
                    <div className="text-[10px] text-secondary mt-auto mb-1">DAYS LEFT</div>
                 </div>
              </div>
              
              <button className="btn-saffron w-full mt-6 gap-2">
                 Share My Timeline
                 <ArrowRight size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ date, label, status }: { date: string, label: string, status: 'done' | 'active' | 'pending' }) {
  const statusColors = {
    done: 'bg-green-600',
    active: 'bg-primary animate-pulse',
    pending: 'bg-cream-border'
  };

  return (
    <div className="flex gap-4 items-center">
       <div className="font-mono text-xs font-bold text-secondary w-12">{date}</div>
       <div className={`w-3 h-3 rounded-full ${statusColors[status]} shrink-0`} />
       <div className={`text-sm font-bold ${status === 'pending' ? 'text-secondary' : 'text-navy'}`}>{label}</div>
    </div>
  );
}
