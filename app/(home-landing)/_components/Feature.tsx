import { cn } from "@/lib/utils";
import {
  BrainIcon,
  CodeIcon,
  DatabaseIcon,
  Edit3Icon,
  EyeIcon,
  FileJson2Icon,
  GlobeIcon,
  Link2Icon,
  MouseIcon,
  MousePointerClick,
  SendIcon,
  TextIcon,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Launch browser",
      description:
        "Initiates a browser instance to begin the web scraping process, enabling interaction with web pages.",
      icon: <GlobeIcon className="stroke-pink-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-pink-500",
      bgGradient: "from-pink-500/10 to-purple-500/10",
    },
    {
      title: "Page to HTML",
      description:
        "Extracts the complete HTML content of the current page for detailed analysis and processing.",
      icon: <CodeIcon className="stroke-blue-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-blue-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Extract text from element",
      description:
        "Retrieves the text content from a specified HTML element using a given CSS selector.",
      icon: <TextIcon className="stroke-green-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-green-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Fill input",
      description:
        "Automatically fills a specified input field with a desired value, emulating user input.",
      icon: <Edit3Icon className="stroke-orange-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-orange-500",
      bgGradient: "from-orange-500/10 to-yellow-500/10",
    },
    {
      title: "Click Element",
      description:
        "Simulates a click action on a specified HTML element, triggering any associated events or navigation.",
      icon: <MousePointerClick className="stroke-indigo-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-indigo-500",
      bgGradient: "from-indigo-500/10 to-purple-500/10",
    },
    {
      title: "Scroll to element",
      description:
        "Scrolls to a specified element on the page, emulating user behavior for dynamic content loading.",
      icon: <MouseIcon className="stroke-teal-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-teal-500",
      bgGradient: "from-teal-500/10 to-blue-500/10",
    },
    {
      title: "Wait for element",
      description:
        "Pauses the workflow until a specified element becomes visible or hidden on the page.",
      icon: <EyeIcon className="stroke-amber-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-amber-500",
      bgGradient: "from-amber-500/10 to-orange-500/10",
    },
    {
      title: "Deliver via webhook",
      description:
        "Sends the scraped data to an external API endpoint through a POST request for further processing or storage.",
      icon: <SendIcon className="stroke-violet-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-violet-500",
      bgGradient: "from-violet-500/10 to-purple-500/10",
    },
    {
      title: "Extract data via AI",
      description:
        "Uses AI to parse HTML content and extract structured data based on a custom prompt, returning JSON output.",
      icon: <BrainIcon className="stroke-rose-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-rose-500",
      bgGradient: "from-rose-500/10 to-pink-500/10",
    },
    {
      title: "Read JSON",
      description:
        "Reads and retrieves a specific key or property from a JSON object for use in workflows.",
      icon: <FileJson2Icon className="stroke-cyan-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-cyan-500",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
    },
    {
      title: "Build JSON",
      description:
        "Adds or updates data within an existing JSON object or creates a new one with the specified properties.",
      icon: <DatabaseIcon className="stroke-emerald-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-emerald-500",
      bgGradient: "from-emerald-500/10 to-green-500/10",
    },
    {
      title: "Navigate to URL",
      description:
        "Navigates to a specified URL, loading the desired web page for scraping or interaction.",
      icon: <Link2Icon className="stroke-purple-400 h-6 w-6" />,
      hoverChipClassName: "group-hover/feature:bg-purple-500",
      bgGradient: "from-purple-500/10 to-violet-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature
          key={feature.title}
          {...feature}
          index={index}
          hoverChipClassName={feature.hoverChipClassName as string}
          bgGradient={feature.bgGradient}
        />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  hoverChipClassName,
  bgGradient,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  hoverChipClassName?: string;
  bgGradient?: string;
}) => {
  return (
    <div
      className={cn(
        "relative group/feature p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-neutral-300 dark:hover:border-neutral-700",
        `bg-gradient-to-br ${bgGradient}`
      )}
    >
      {/* Animated background gradient */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300 bg-gradient-to-br",
        bgGradient
      )} />
      
      {/* Icon container */}
      <div className="mb-4 relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover/feature:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      {/* Title */}
      <div className="relative z-10 mb-3">
        <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 group-hover/feature:text-white transition-colors duration-300">
          {title}
        </h3>
        <div className={cn(
          "h-1 w-0 group-hover/feature:w-full transition-all duration-500 rounded-full mt-2",
          hoverChipClassName?.replace("group-hover/feature:bg-", "bg-") || "bg-blue-500"
        )} />
      </div>
      
      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 group-hover/feature:text-neutral-200 relative z-10 leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};
