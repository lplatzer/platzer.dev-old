'use client';

import { DocLayout, DocSection, DocSubsection } from '@/components/DocLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Shield, Smartphone } from 'lucide-react';

export default function GeneralToolsPage() {
  const sections = [
    {
      title: 'QR Code Generator',
      id: 'qr-generator',
      subsections: [
        { title: 'What is it?', id: 'what-is-it' },
        { title: 'How to Use', id: 'how-to-use' },
        { title: 'Use Cases', id: 'use-cases' },
        { title: 'Security Tips', id: 'security-tips' },
        { title: 'Best Practices', id: 'best-practices' },
        { title: 'Troubleshooting', id: 'troubleshooting' }
      ]
    }
  ];

  return (
    <DocLayout
      title="General Tools Guide"
      description="Learn how to use the QR Code Generator and other utility tools"
      sections={sections}
    >
      <DocSection id="qr-generator" title="QR Code Generator">
        <p className="lead text-xl text-muted-foreground mb-6">
          Create custom QR codes for various purposes, with a special focus on WiFi network sharing.
        </p>

        <DocSubsection id="what-is-it" title="What is it?">
          <p>
            The QR Code Generator allows you to create QR codes that can be scanned by smartphones and other devices. 
            The primary feature is WiFi QR code generation, making it easy to share network credentials without typing long passwords.
          </p>
        </DocSubsection>

        <DocSubsection id="how-to-use" title="How to Use">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Creating a WiFi QR Code</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">1. Navigate to the Tool</p>
                  <p className="text-muted-foreground">Select "QR Code Generator" from the Tools menu</p>
                </div>

                <div>
                  <p className="font-medium mb-2">2. Fill in WiFi Details</p>
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div>
                        <strong>Network Name (SSID):</strong>
                        <p className="text-sm text-muted-foreground">Enter your WiFi network name</p>
                      </div>
                      <div>
                        <strong>Password:</strong>
                        <p className="text-sm text-muted-foreground">Enter your WiFi password</p>
                      </div>
                      <div>
                        <strong>Encryption Type:</strong>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge>WPA/WPA2 - Most common (recommended)</Badge>
                          <Badge variant="outline">WEP - Older encryption (less secure)</Badge>
                          <Badge variant="outline">None - Open networks</Badge>
                        </div>
                      </div>
                      <div>
                        <strong>Hidden Network:</strong>
                        <p className="text-sm text-muted-foreground">Check this box if your network SSID is hidden</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <p className="font-medium mb-2">3. Generate QR Code</p>
                  <p className="text-muted-foreground">Click the submit/generate button</p>
                </div>

                <div>
                  <p className="font-medium mb-2">4. Use the QR Code</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Display it on your screen for guests to scan</li>
                    <li>Download or screenshot it for printing</li>
                    <li>Share it digitally with others</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Scanning the QR Code
              </h4>
              
              <Tabs defaultValue="guests" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="guests">For Guests</TabsTrigger>
                  <TabsTrigger value="devices">Compatible Devices</TabsTrigger>
                </TabsList>
                <TabsContent value="guests">
                  <Card>
                    <CardContent className="pt-6">
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Open your phone's camera app (most modern phones support QR scanning natively)</li>
                        <li>Point the camera at the QR code</li>
                        <li>Tap the notification that appears</li>
                        <li>Your device will automatically connect to the WiFi network</li>
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="devices">
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div>
                        <strong>iOS:</strong>
                        <p className="text-sm text-muted-foreground">iPhone (iOS 11+) with Camera app</p>
                      </div>
                      <div>
                        <strong>Android:</strong>
                        <p className="text-sm text-muted-foreground">Most Android phones (Android 10+) with Camera app</p>
                      </div>
                      <div>
                        <strong>Alternative:</strong>
                        <p className="text-sm text-muted-foreground">Use any QR code reader app from the app store</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DocSubsection>

        <DocSubsection id="use-cases" title="Use Cases">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">Home Networks</h5>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Print and place in guest rooms</li>
                  <li>Share with visitors easily</li>
                  <li>Keep on fridge for guest access</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">Business/Office</h5>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Guest WiFi for clients</li>
                  <li>Conference rooms</li>
                  <li>Co-working spaces</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">Events</h5>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Wedding venues</li>
                  <li>Conferences and workshops</li>
                  <li>Temporary event setups</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">Hospitality</h5>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Hotels and B&Bs</li>
                  <li>Vacation rentals</li>
                  <li>Restaurants and cafes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </DocSubsection>

        <DocSubsection id="security-tips" title="Security Tips">
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="font-semibold text-amber-900 dark:text-amber-100">Important Security Considerations</p>
                  <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                    <li><strong>Use WPA/WPA2 Encryption:</strong> Always use the strongest encryption available</li>
                    <li><strong>Separate Guest Networks:</strong> Consider creating a separate guest network for visitors</li>
                    <li><strong>Regular Password Changes:</strong> Update your WiFi password periodically and regenerate the QR code</li>
                    <li><strong>Control Distribution:</strong> Be mindful of where you post or share your WiFi QR codes</li>
                    <li><strong>Monitor Connected Devices:</strong> Regularly check which devices are connected to your network</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </DocSubsection>

        <DocSubsection id="best-practices" title="Best Practices">
          <ul className="space-y-2">
            <li>
              <strong>Clear Display:</strong> Make sure the QR code is large enough to scan easily (at least 2-3 inches if printed)
            </li>
            <li>
              <strong>Good Lighting:</strong> Place printed QR codes in well-lit areas
            </li>
            <li>
              <strong>Test First:</strong> Always test the QR code before distributing it widely
            </li>
            <li>
              <strong>Include Instructions:</strong> For less tech-savvy users, add simple scanning instructions near the code
            </li>
            <li>
              <strong>Backup Method:</strong> Always have the password written down as a backup
            </li>
          </ul>
        </DocSubsection>

        <DocSubsection id="troubleshooting" title="Troubleshooting">
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold mb-2">QR Code Won't Scan</h5>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Ensure good lighting</li>
                      <li>Hold camera steady and at the right distance</li>
                      <li>Make sure the QR code is not damaged or distorted</li>
                      <li>Try a dedicated QR reader app if native camera doesn't work</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold mb-2">Device Won't Connect</h5>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Verify the WiFi information is correct</li>
                      <li>Check that encryption type matches your router settings</li>
                      <li>Ensure WiFi is turned on and in range</li>
                      <li>Try entering credentials manually as a backup</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold mb-2">Wrong Information Entered</h5>
                    <p className="text-sm text-muted-foreground">
                      Simply regenerate a new QR code with the correct information. Delete or destroy old QR codes to avoid confusion.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DocSubsection>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Coming Soon</h4>
          <p className="text-muted-foreground">
            Additional tools in development: Digital Wishlist creator, more QR code types (URLs, contact info, etc.), 
            and additional utility tools. Check back for updates!
          </p>
        </div>
      </DocSection>
    </DocLayout>
  );
}
