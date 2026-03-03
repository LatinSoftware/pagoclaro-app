import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { ClientProfile } from "@/types/client";

interface ClientBasicInfoProps {
  client: ClientProfile;
}

export function ClientBasicInfo({ client }: ClientBasicInfoProps) {
  const mapLink = 
    client.latitude && client.longitude 
      ? `https://maps.google.com/?q=${client.latitude},${client.longitude}` 
      : null;

  return (
    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 animate-in fade-in duration-500">
      <div className="space-y-8">
        {/* Contact Details */}
        <section className="space-y-4">
          <div className="flex items-center gap-4 group">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Phone Number</p>
              <a href={`tel:${client.phone}`} className="text-sm  hover:text-primary transition-colors">
                {client.phone}
              </a>
            </div>
          </div>

          {client.email && (
            <div className="flex items-center gap-4 group">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">Email Address</p>
                <a href={`mailto:${client.email}`} className="text-sm hover:text-primary transition-colors">
                  {client.email}
                </a>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 group">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Address</p>
              <div className="text-sm  ">
                {client.address.split(', ').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      <div className="space-y-8">
        {/* Map Preview */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black  uppercase tracking-widest">
              Geolocation
            </h3>
            {mapLink && (
              <a 
                href={mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
              >
                Full map <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          
          <div className="relative w-full aspect-video md:aspect-square lg:aspect-video rounded-xl overflow-hidden border border-primary/10 bg-slate-100 dark:bg-slate-800 group">
            {client.latitude && client.longitude ? (
              <iframe
                src={`https://maps.google.com/maps?q=${client.latitude},${client.longitude}&z=15&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Client Exact Location"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
                <MapPin className="h-8 w-8 opacity-20 mb-2" />
                <p className="text-xs">No location coordinates registered.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
