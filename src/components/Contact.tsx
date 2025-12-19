import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative py-28  overflow-hidden page-enter">
      <div className="max-w-7xl mx-auto px-4 relative">

        {/* BLUE BACK PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#0c2d48] rounded-2xl px-10 py-16 lg:px-16 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* QUICK CONTACT */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="text-white"
            >
              <motion.span
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-yellow-400 text-sm font-semibold tracking-wide uppercase"
              >
                Quick Contact
              </motion.span>

              <motion.h3
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-3xl font-semibold mt-3 mb-6 leading-snug"
              >
                We’d Love to Hear From You
              </motion.h3>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-gray-300 max-w-md mb-10"
              >
                Reach out to Seven Seafoods for premium seafood supplies,
                bulk orders, and export-related enquiries.
              </motion.p>

              <div className="space-y-6 text-sm">
                <InfoItem icon={<Phone />} label="Phone">
                  +91 84999 19197
                </InfoItem>

                <InfoItem icon={<Mail />} label="Email">
                  sevenseafoods7@gmail.com
                </InfoItem>

                <InfoItem icon={<MapPin />} label="Location">
                  Fishing Harbour, Visakhapatnam – 530001
                </InfoItem>

                <InfoItem icon={<Clock />} label="Working Hours">
                  Mon – Sun : 6:00 AM – 5:00 PM
                </InfoItem>
              </div>
            </motion.div>

            <div className="hidden lg:block" />
          </div>
        </motion.div>

        {/* REQUEST A QUOTE – FLOATING */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="
            relative lg:absolute
            lg:right-16
            lg:top-[-60px]
            bg-yellow-500
            rounded-2xl
            shadow-2xl
            p-12
            w-full
            max-w-md
            mx-auto
            mt-16
            lg:mt-0
            z-20
            min-h-[660px]
            flex flex-col
            justify-center
          "
        >
          <h3 className="text-2xl font-semibold text-[#0c2d48] mb-8">
            Request a Quote
          </h3>

          <form className="space-y-5">
            <Input placeholder="Full Name" />
            <Input type="email" placeholder="Email Address" />
            <Input type="tel" placeholder="Phone Number" />

            <select className="w-full bg-white px-4 py-3 rounded-md text-sm text-gray-700 outline-none">
              <option>Select Service</option>
              <option>Fresh Seafood Supply</option>
              <option>Bulk Orders</option>
              <option>Export Enquiry</option>
            </select>

            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full bg-white px-4 py-3 rounded-md text-sm text-gray-900 placeholder-gray-400 outline-none resize-none"
            />

            <button
              type="submit"
              className="mt-4 w-full bg-[#0c2d48] text-white py-3 rounded-md text-sm font-semibold tracking-wide hover:bg-[#09345a] transition"
            >
              SUBMIT NOW
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-4"
    >
      <div className="text-yellow-400 mt-1">{icon}</div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-300">{children}</p>
      </div>
    </motion.div>
  );
}

function Input({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-white px-4 py-3 rounded-md text-sm text-gray-900 placeholder-gray-400 outline-none"
    />
  );
}
