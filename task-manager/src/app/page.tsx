import Link from "next/link"
import { CheckCircle, Users, Calendar, BarChart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjEyMTIxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzMTMxMzEiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20"></div>
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white animate-fade-in-up">
                  Empower Your Team with TaskMaster
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-up animation-delay-200">
                  The ultimate task management platform for leaders and their teams. Streamline collaboration, boost productivity, and achieve your goals together.
                </p>
                <div className="animate-fade-in-up animation-delay-400">
                  <Link href="/signin" className="inline-block bg-blue-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-blue-600 transition-colors duration-300">Get Started</Link>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-gray-700 border-gray-600 p-6 transition-transform duration-300 hover:scale-105 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Users className="h-12 w-12 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">Team Collaboration</h3>
                      <p className="text-lg text-gray-300">Seamlessly work together with your team members on shared tasks and projects.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 border-gray-600 p-6 transition-transform duration-300 hover:scale-105 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <BarChart className="h-12 w-12 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">Progress Tracking</h3>
                      <p className="text-lg text-gray-300">Monitor team progress and individual performance with detailed analytics.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 bg-opacity-50 backdrop-blur-lg">
          <div className="container px-4 md:px-6">
            <div className="bg-gray-700 border-gray-600 p-6 transition-transform duration-300 hover:scale-105 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Calendar className="h-12 w-12 text-blue-400 flex-shrink-0" />
                <h3 className="text-2xl font-bold text-white">Task Scheduling</h3>
              </div>
              <p className="text-lg text-gray-300 mb-4">Easily schedule and manage tasks with our intuitive calendar interface.</p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-7 gap-2 text-center font-medium">
                  <div className="text-gray-400">Sun</div>
                  <div className="text-gray-400">Mon</div>
                  <div className="text-gray-400">Tue</div>
                  <div className="text-gray-400">Wed</div>
                  <div className="text-gray-400">Thu</div>
                  <div className="text-gray-400">Fri</div>
                  <div className="text-gray-400">Sat</div>
                </div>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {[...Array(31)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-10 flex items-center justify-center rounded-full ${
                        i === 14 ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                      } transition-colors duration-200`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10"></div>
          <div className="container px-4 md:px-6 relative">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center mb-8 text-white animate-fade-in-up">How It Works</h2>
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="flex flex-col items-center space-y-2 border-r border-gray-700 pr-4">
                <h3 className="text-2xl font-bold mb-2 text-white">For Leaders</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-lg text-gray-300 transition-transform duration-200 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                    Create and assign tasks to team members
                  </li>
                  <li className="flex items-center text-lg text-gray-300 transition-transform duration-200 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                    Set priorities and deadlines
                  </li>
                  <li className="flex items-center text-lg text-gray-300 transition-transform duration-200 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                    Monitor team progress and performance
                  </li>
                  <li className="flex items-center text-lg text-gray-300 transition-transform duration-200 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                    Generate reports and insights
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center space-y-2 pl-4">
                <h3 className="text-2xl font-bold mb-2 text-white">For Team Members</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-lg text-gray-300 transition-transform duration-200 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                    View and manage assigned tasks
                  </li>
                  <li className="flex items-center text-lg text-gray-300 transition-transform duration-200 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                    Collaborate with team members
                  </li>
                  <li className="flex items-center text-lg text-gray-300 transition-transform duration-200 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                    Update task status and progress
                  </li>
                  <li className="flex items-center text-lg text-gray-300 transition-transform duration-200 hover:translate-x-2">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                    Receive notifications and reminders
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative z-10 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2023 TaskMaster. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-400 hover:text-blue-400 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-400 hover:text-blue-400 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}