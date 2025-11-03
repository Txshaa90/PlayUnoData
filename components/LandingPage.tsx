'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Users, 
  Zap, 
  Shield, 
  Download, 
  Upload,
  Filter,
  BarChart3,
  Palette,
  Globe,
  Check,
  ArrowRight,
  Star,
  Play
} from 'lucide-react'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PlayUnoData</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Templates</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</Link>
              <Link 
                href="/auth/signup" 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Build powerful
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> databases</span>
              <br />without code
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create, organize, and collaborate on your data with the simplicity of a spreadsheet 
              and the power of a database. Start with templates or build from scratch.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                href="/auth/signup"
                className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Start for Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play className="h-5 w-5 ml-1" />
                </div>
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Mockup */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-3xl -z-10" />
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Mock toolbar */}
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <BarChart3 className="h-4 w-4 ml-2" />
                    <span>Group</span>
                    <Palette className="h-4 w-4 ml-2" />
                    <span>Color</span>
                  </div>
                </div>
              </div>
              
              {/* Mock data grid */}
              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="font-semibold text-gray-900">Project Name</div>
                  <div className="font-semibold text-gray-900">Status</div>
                  <div className="font-semibold text-gray-900">Priority</div>
                  <div className="font-semibold text-gray-900">Assignee</div>
                </div>
                
                {[
                  { name: 'Website Redesign', status: 'In Progress', priority: 'High', assignee: 'Sarah Chen', color: 'bg-blue-100' },
                  { name: 'Mobile App', status: 'Approved', priority: 'Medium', assignee: 'Mike Johnson', color: 'bg-green-100' },
                  { name: 'Database Migration', status: 'Pending', priority: 'High', assignee: 'Alex Rodriguez', color: 'bg-yellow-100' },
                ].map((row, index) => (
                  <motion.div 
                    key={index}
                    className={`grid grid-cols-4 gap-4 p-3 rounded-lg ${row.color} mb-2`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    <div className="font-medium text-gray-900">{row.name}</div>
                    <div className="text-gray-700">{row.status}</div>
                    <div className="text-gray-700">{row.priority}</div>
                    <div className="text-gray-700">{row.assignee}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Everything you need to organize your data
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Powerful features that make data management simple, collaborative, and beautiful.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: 'Flexible Database',
                description: 'Create custom fields, link records, and organize data exactly how you need it.',
                color: 'text-blue-600'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Share workspaces, assign tasks, and collaborate in real-time with your team.',
                color: 'text-green-600'
              },
              {
                icon: Zap,
                title: 'Powerful Automation',
                description: 'Automate workflows, set up triggers, and save time with smart automations.',
                color: 'text-purple-600'
              },
              {
                icon: Filter,
                title: 'Advanced Filtering',
                description: 'Filter, sort, and group your data with powerful query tools.',
                color: 'text-orange-600'
              },
              {
                icon: Palette,
                title: 'Beautiful Views',
                description: 'Visualize your data with Grid, Calendar, Gallery, and Kanban views.',
                color: 'text-pink-600'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level security with encryption, backups, and access controls.',
                color: 'text-red-600'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 ${feature.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Start with a template
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Choose from hundreds of templates or create your own from scratch.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Project Management',
                description: 'Track tasks, deadlines, and team progress',
                badge: 'Free',
                badgeColor: 'bg-green-100 text-green-800',
                image: '🚀'
              },
              {
                title: 'CRM & Sales',
                description: 'Manage leads, contacts, and deals',
                badge: 'Premium',
                badgeColor: 'bg-purple-100 text-purple-800',
                image: '💼'
              },
              {
                title: 'Content Calendar Pro',
                description: 'Advanced content management with analytics dashboard, pipeline tracking, and performance insights',
                badge: 'Premium',
                badgeColor: 'bg-purple-100 text-purple-800',
                image: '📊'
              },
              {
                title: 'Inventory Management',
                description: 'Track products, stock, and orders',
                badge: 'Premium',
                badgeColor: 'bg-purple-100 text-purple-800',
                image: '📦'
              },
              {
                title: 'Event Planning',
                description: 'Organize events and manage attendees',
                badge: 'Free',
                badgeColor: 'bg-green-100 text-green-800',
                image: '🎉'
              },
              {
                title: 'HR & Recruiting',
                description: 'Manage candidates and hiring process',
                badge: 'Premium',
                badgeColor: 'bg-purple-100 text-purple-800',
                image: '👥'
              },
              {
                title: 'Blank Template',
                description: 'Start from scratch or import CSV/Excel with PMH styling',
                badge: 'Free',
                badgeColor: 'bg-green-100 text-green-800',
                image: '📄'
              }
            ].map((template, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{template.image}</div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${template.badgeColor}`}>
                    {template.badge}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {template.title}
                </h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <button className="text-green-600 font-medium hover:text-green-700 transition-colors flex items-center gap-1">
                  Use Template
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/templates"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              View All Templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Simple, transparent pricing
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Start free and scale as you grow. No hidden fees, no surprises.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                period: 'forever',
                description: 'Perfect for personal projects and small teams',
                features: [
                  'Up to 3 workspaces',
                  '1,000 records per workspace',
                  'Basic templates',
                  'Community support',
                  'Mobile app access'
                ],
                cta: 'Start Free',
                ctaStyle: 'bg-gray-900 text-white hover:bg-gray-800',
                popular: false
              },
              {
                name: 'Pro',
                price: '$12',
                period: 'per user/month',
                description: 'For growing teams and businesses',
                features: [
                  'Unlimited workspaces',
                  'Unlimited records',
                  'Premium templates',
                  'Priority support',
                  'Advanced permissions',
                  'API access',
                  'Custom branding'
                ],
                cta: 'Start Pro Trial',
                ctaStyle: 'bg-green-600 text-white hover:bg-green-700',
                popular: true
              }
            ].map((plan, index) => (
              <motion.div 
                key={index}
                className={`bg-white p-8 rounded-xl shadow-sm border-2 ${
                  plan.popular ? 'border-green-500 relative' : 'border-gray-100'
                } hover:shadow-md transition-shadow duration-200`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.ctaStyle}`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">PlayUnoData</span>
              </div>
              <p className="text-gray-400 mb-4">
                Build powerful databases without code. Simple, collaborative, and beautiful.
              </p>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Star className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Try Demo</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 PlayUnoData. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
