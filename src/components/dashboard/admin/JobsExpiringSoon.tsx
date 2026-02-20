import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const jobs = [
    { title: "Data Scientist", company: "DataDriven", expires: "in 2 days", logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771236535/nyhaho_rznhuo.png" },
    { title: "Marketing Lead", company: "Zenith Media", expires: "in 3 days", logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771506208/as_g9b1tj.jpg" },
    { title: "Junior Dev", company: "Innovate Inc.", expires: "in 5 days", logo: "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771506208/xz_ytdm3m.png" },
]

export function JobsExpiringSoon({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Jobs Expiring Soon</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={job.logo} alt={job.company} data-ai-hint="company logo"/>
              <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{job.title}</p>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div className="ml-auto text-sm text-muted-foreground">{job.expires}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
