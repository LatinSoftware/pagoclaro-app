import { Phone, Mail, MapPin, ExternalLink, Briefcase, DollarSign, User, Users, Calendar, Heart, FileText } from "lucide-react";
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

          {client.secondary_phone && (
            <div className="flex items-center gap-4 group">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">Secondary Phone</p>
                <a href={`tel:${client.secondary_phone}`} className="text-sm  hover:text-primary transition-colors">
                  {client.secondary_phone}
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

        {/* Personal Details (Optional) */}
        {(client.birth_date || client.gender || client.marital_status) && (
          <section className="space-y-4 pt-6 border-t border-border/50">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground pb-2">
              Personal Information
            </h3>
            
            {client.birth_date && (
              <div className="flex items-center gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Birth Date</p>
                  <p className="text-sm">{new Date(client.birth_date).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            {client.gender && (
              <div className="flex items-center gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Gender</p>
                  <p className="text-sm capitalize">{client.gender.replace(/_/g, " ")}</p>
                </div>
              </div>
            )}

            {client.marital_status && (
              <div className="flex items-center gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Marital Status</p>
                  <p className="text-sm capitalize">{client.marital_status}</p>
                </div>
              </div>
            )}
            
            {client.notes && (
              <div className="flex items-start gap-4 group pt-2">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Notes</p>
                  <p className="text-sm max-w-sm text-balance">{client.notes}</p>
                </div>
              </div>
            )}
          </section>
        )}
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

        {/* Financial Information */}
        {(client.occupation || client.company_name || client.monthly_income || client.income_source) && (
          <section className="space-y-4 pt-6 border-t border-border/50">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground pb-2">
              Financial Information
            </h3>
            
            {(client.occupation || client.company_name) && (
              <div className="flex items-center gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Occupation & Company</p>
                  <p className="text-sm">
                    {client.occupation || "N/A"} {client.company_name ? `at ${client.company_name}` : ""}
                  </p>
                </div>
              </div>
            )}

            {(client.monthly_income || client.income_source) && (
              <div className="flex items-center gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Income</p>
                  <p className="text-sm">
                    {client.monthly_income 
                      ? new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(client.monthly_income)
                      : "N/A"} 
                    {client.income_source ? ` (${client.income_source.replace(/_/g, " ")})` : ""}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* References */}
        {(client.reference_name || client.reference_phone) && (
          <section className="space-y-4 pt-6 border-t border-border/50">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground pb-2">
              Reference Contact
            </h3>
            
            <div className="flex items-center gap-4 group">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">
                  {client.reference_relationship || "Reference"}
                </p>
                <p className="text-sm font-medium">{client.reference_name || "N/A"}</p>
                {client.reference_phone && (
                  <a href={`tel:${client.reference_phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {client.reference_phone}
                  </a>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
