
const ContactForm = () => {
    return (
        <div className="w-full rounded-lg p-8">
          <form>
            <div className="mb-4 space-y-3">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Your fullname"
                name="fullname"
                required
                className="w-full p-2 border border-gray-400 shadow-sm rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 space-y-3">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                required
                className="w-full p-2 border border-gray-400 shadow-sm bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 space-y-3">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="Your phone number"
                name="phone"
                required
                className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 space-y-3">
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                placeholder="Your city"
                name="city"
                required
                className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 space-y-3">
              <label className="block text-gray-700">Reason</label>
              <input
                type="text"
                placeholder="Your reason"
                name="reason"
                required
                className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 space-y-3">
              <label className="block text-gray-700">Your message</label>
              <textarea
                placeholder="Your message"
                name="message"
                rows="4"
                required
                className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded"
            >
              Send message
            </button>
          </form>
      </div>
    )
}

export default ContactForm;