"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Calculator, Menu, X, CircleUser, LogOut, Wrench } from "lucide-react"
import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Session } from '@supabase/supabase-js'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

// Data untuk dropdown "Belajar"
const belajarItems: { title: string; href: string; description: string }[] = [
  { title: "Materi", href: "/lessons", description: "Pelajari konsep matematika dari dasar hingga mahir." },
  { title: "Kuis", href: "/quizzes", description: "Uji pemahaman Anda dengan latihan soal interaktif." },
  { title: "Topik", href: "/topics", description: "Fokus pada topik spesifik seperti Aljabar atau Geometri." },
]

// Data BARU untuk dropdown "Bank Soal"
const bankSoalItems: { title: string; href: string; description: string }[] = [
    { title: "OSN", href: "/bank-soal/osn", description: "Olimpiade Sains Nasional" },
    { title: "ONMIPA-PT", href: "/bank-soal/onmipa-pt", description: "Olimpiade Nasional MIPA Perguruan Tinggi" },
    { title: "UTBK-SNBT", href: "/bank-soal/utbk-snbt", description: "Ujian Tulis Berbasis Komputer" },
    { title: "SIMAK-UI", href: "/bank-soal/simak-ui", description: "Seleksi Masuk Universitas Indonesia" },
    { title: "UTUL-UGM", href: "/bank-soal/utul-ugm", description: "Ujian Tulis Universitas Gadjah Mada" },
]


export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  
  type Profile = { id: string; role: string | null; }
  const [profile, setProfile] = useState<Profile | null>(null)
  
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
    setProfile(null)
    router.refresh()
  }

  useEffect(() => {
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      
      if (session) {
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setProfile(userProfile)
      }
    }
    
    getSessionAndProfile()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      if (event === "SIGNED_OUT") {
        setProfile(null)
      } else if (event === "SIGNED_IN" && session) {
        const getProfileOnLogin = async () => {
            const { data: userProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
            setProfile(userProfile)
        }
        getProfileOnLogin()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MathGrit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Dropdown Belajar */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Belajar</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {belajarItems.map((component) => (
                        <ListItem key={component.title} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Dropdown Bank Soal BARU */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Bank Soal</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {bankSoalItems.map((item) => (
                            <ListItem key={item.title} title={item.title} href={item.href}>
                              {item.description}
                            </ListItem>
                          ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
            
            {profile?.role === 'admin' && (
              <Link href="/admin/add-question" className={cn(navigationMenuTriggerStyle(), "text-destructive hover:text-destructive/80")}>
                <Wrench className="mr-2 h-4 w-4" /> Admin
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Signed in as</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm"><Link href="/login">Login</Link></Button>
                <Button asChild size="sm"><Link href="/register">Daftar</Link></Button>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          // Untuk mobile, kita tampilkan sebagai daftar biasa agar mudah diakses
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <p className="px-4 font-semibold text-muted-foreground">Belajar</p>
              {belajarItems.map((item) => <Link key={item.href} href={item.href} className="text-base font-medium pl-8" onClick={() => setIsOpen(false)}>{item.title}</Link>)}
              
              <p className="px-4 font-semibold text-muted-foreground pt-2">Bank Soal</p>
              {bankSoalItems.map((item) => <Link key={item.href} href={item.href} className="text-base font-medium pl-8" onClick={() => setIsOpen(false)}>{item.title}</Link>)}

              {profile?.role === 'admin' && (
                <Link href="/admin/add-question" className="flex items-center text-base font-medium text-destructive" onClick={() => setIsOpen(false)}>
                  <Wrench className="mr-2 h-4 w-4" /> Admin
                </Link>
              )}

              <div className="border-t pt-4 flex flex-col space-y-3">
                {session ? (
                  <>
                    <p className="text-sm text-muted-foreground">{session.user.email}</p>
                    <Button onClick={handleLogout} variant="outline">Logout</Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost"><Link href="/login" onClick={() => setIsOpen(false)}>Login</Link></Button>
                    <Button asChild><Link href="/register" onClick={() => setIsOpen(false)}>Daftar</Link></Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"