'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Facebook, Instagram, Twitter, Upload, Search, Zap, ThumbsUp, Menu } from 'lucide-react'

 

type Section = 'home' | 'profile' | 'howItWorks'

interface HeaderProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const navItems: { name: string; section: Section }[] = [
  { name: 'Home', section: 'home' },
  { name: 'Profile', section: 'profile' },
  { name: 'How It Works', section: 'howItWorks' },
]

export function Header({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white bg-opacity-90 backdrop-blur-md z-10 shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600">HealthyChoices</div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((link) => (
              <Button
                key={link.name}
                variant={activeSection === link.section ? "default" : "ghost"}
                onClick={() => setActiveSection(link.section)}
                className={`text-lg ${activeSection === link.section ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                {link.name}
              </Button>
            ))}
          </div>
          <Button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu />
          </Button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2">
          {navItems.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              onClick={() => {
                setActiveSection(link.section)
                setMobileMenuOpen(false)
              }}
              className="w-full text-left text-lg py-2 px-4"
            >
              {link.name}
            </Button>
          ))}
        </div>
      )}
    </header>
  )
}
export default function HealthyChoicesApp() {
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeSection === 'home' && <Home />}
        {activeSection === 'profile' && <Profile />}
        {activeSection === 'howItWorks' && <HowItWorks />}
      </main>
      <Footer />
    </div>
  )
}

function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Make Healthier Choices</h1>
        <p className="text-xl text-gray-600 mb-8">Discover the nutritional value of your food with AI-powered analysis</p>
        <Button className="text-lg px-6 py-3 bg-green-600 hover:bg-green-700">Get Started</Button>
      </section>
      <UploadForm />
      <AnalysisResult />
      <Recommendations />
    </div>
  )
}

function UploadForm() {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Upload Product Image</CardTitle>
        <CardDescription>Take a photo or upload an image of the product for instant analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture" className="text-lg text-gray-700">Product Image</Label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                >
                  <span>Upload a file</span>
                  <Input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700">Analyze Product</Button>
      </CardFooter>
    </Card>
  )
}

function AnalysisResult() {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Product Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-green-50 bg-opacity-50">
            <Search className="h-6 w-6 text-green-600" />
            <span className="text-lg text-gray-700">Ingredients identified: 12</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-yellow-50 bg-opacity-50">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span className="text-lg text-gray-700">Nutritional value: Moderate</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-blue-50 bg-opacity-50">
            <ThumbsUp className="h-6 w-6 text-blue-500" />
            <span className="text-lg text-gray-700">Health score: 7.5/10</span>
          </div>
        </div>
        <p className="mt-4 text-gray-600">Detailed ingredient analysis and health insights will be displayed here.</p>
      </CardContent>
    </Card>
  )
}

function Recommendations() {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Healthier Alternatives</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Based on your product analysis, here are some healthier alternatives:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Alternative {item}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">A healthier option with improved nutritional value.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function Profile() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Your Health Profile</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <ProfileForm />
        <SettingsForm />
      </div>
    </div>
  )
}

function ProfileForm() {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold text-gray-800">Health Profile</CardTitle>
      <CardDescription>Provide your details for personalized recommendations</CardDescription>
    </CardHeader>
    <CardContent>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg text-gray-700">Name</Label>
          <Input id="name" placeholder="Your name" className="text-lg" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" className="text-lg text-gray-700">Age</Label>
          <Input id="age" type="number" placeholder="Your age" className="text-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-lg text-gray-700">Height (cm)</Label>
            <Input id="height" type="number" placeholder="Height in cm" className="text-lg" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-lg text-gray-700">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="Weight in kg" className="text-lg" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="activity-level" className="text-lg text-gray-700">Activity Level</Label>
          <Select>
            <SelectTrigger id="activity-level">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
              <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
              <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
              <SelectItem value="very">Very active (hard exercise 6-7 days/week)</SelectItem>
              <SelectItem value="extra">Extra active (very hard exercise & physical job)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dietary-preferences" className="text-lg text-gray-700">Dietary Preferences</Label>
          <Select>
            <SelectTrigger id="dietary-preferences">
              <SelectValue placeholder="Select your diet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="omnivore">Omnivore</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
              <SelectItem value="keto">Ketogenic</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="gluten-free">Gluten-free</SelectItem>
              <SelectItem value="dairy-free">Dairy-free</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="health-goals" className="text-lg text-gray-700">Health Goals</Label>
          <Select>
            <SelectTrigger id="health-goals">
              <SelectValue placeholder="Select your primary health goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight-loss">Weight Loss</SelectItem>
              <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
              <SelectItem value="maintenance">Maintain Current Weight</SelectItem>
              <SelectItem value="heart-health">Improve Heart Health</SelectItem>
              <SelectItem value="energy">Increase Energy Levels</SelectItem>
              <SelectItem value="overall">Overall Health Improvement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Save Profile</Button>
    </CardFooter>
  </Card>
)
}

function SettingsForm() {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">App Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-lg text-gray-700">Enable Notifications</Label>
            <Switch id="notifications" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language" className="text-lg text-gray-700">Language</Label>
            <Select>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-y-2">
              <Label htmlFor="units" className="text-sm text-gray-600">Measurement Units</Label>
              <Select defaultValue="metric">
                <SelectTrigger id="units">
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (lb, in)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700">Save Settings</Button>
      </CardFooter>
    </Card>
  )
}

function HowItWorks() {
  const steps = [
    { title: "Upload Image", description: "Take a photo or upload an image of the product.", icon: Upload },
    { title: "AI Analysis", description: "Our AI analyzes the ingredients and nutritional information.", icon: Search },
    { title: "Get Results", description: "Receive a detailed health analysis of the product.", icon: Zap },
    { title: "View Alternatives", description: "Explore healthier alternative products.", icon: ThumbsUp },
  ]

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">How It Works</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-800">Step {index + 1}: {step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">HealthyChoices</h3>
            <p className="text-gray-400">Making healthy eating easier for everyone.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; 2023 HealthyChoices. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}