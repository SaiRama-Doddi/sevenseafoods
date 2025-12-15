import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react"


const Contact = () => {
  return (

<section id="contact" className="py-20 bg-muted/30">
  <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-14">
      <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
        Questions? We’re Here to Help
      </h2>
      <p className="text-lg text-muted-foreground">
        Get in touch with Seven Seafoods for fresh seafood supplies,
        bulk orders, or business enquiries.
      </p>
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* LEFT – CTA */}
      <div className="space-y-6 text-center lg:text-left">
        <h3 className="text-2xl font-semibold text-foreground">
          Let’s Talk
        </h3>

        <p className="text-muted-foreground max-w-md mx-auto lg:mx-0">
          Our team is available during business hours and happy to assist
          you with pricing, delivery schedules, and product details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button>
            <a href="https://wa.me/918499919197" target="_blank">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </a>
          </button>

          <button  >
            <a href="mailto:sevenseafoods7@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Send Email
            </a>
          </button>
        </div>
      </div>

      {/* RIGHT – INFO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Contact Info */}
        <div className="bg-background rounded-xl p-6 shadow-sm border">
          <h4 className="text-lg font-semibold mb-4">Contact Info</h4>

          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <span>84999 19197</span>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <span>sevenseafoods7@gmail.com</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <span>
                07 Fishing Harbour,<br />
                Visakhapatnam – 530001
              </span>
            </div>
          </div>
        </div>

        {/* Business & Social */}
        <div className="bg-background rounded-xl p-6 shadow-sm border">
          <h4 className="text-lg font-semibold mb-4">Business & Social</h4>

          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span>6:00 AM – 5:00 PM</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Monday – Friday</span>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.facebook.com/share/16dRaSx1TX/"
                target="_blank"
                className="p-2 rounded-full bg-muted hover:bg-blue-600 hover:text-white transition"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/7seafoods?igsh=NHVqMnM4anBxZnh2"
                target="_blank"
                className="p-2 rounded-full bg-muted hover:bg-pink-600 hover:text-white transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
  )
}

export default Contact


