'use client';

import { DocLayout, DocSection } from '@/components/DocLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

export default function FAQPage() {
  const sections = [
    { title: 'General Questions', id: 'general' },
    { title: 'Coffee Tools', id: 'coffee-tools' },
    { title: 'ETF Tracker', id: 'etf-tracker' },
    { title: 'QR Code Generator', id: 'qr-generator' },
    { title: 'Technical Support', id: 'technical' },
    { title: 'Privacy & Security', id: 'privacy' },
    { title: 'Future Development', id: 'future' }
  ];

  return (
    <DocLayout
      title="Frequently Asked Questions"
      description="Common questions and answers about using Platzer.dev"
      sections={sections}
    >
      <DocSection id="general" title="General Questions">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Platzer.dev?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Platzer.dev is a collection of useful tools bridging software development and coffee culture, 
                created by Luis Platzer. It offers utilities for coffee professionals, investors, and general users.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need to create an account?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                No, most features on the website are available without registration or login. 
                Simply visit the site and start using the tools.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is the website free to use?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes, all tools are currently free to use. There are no subscription fees or hidden costs.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What browsers are supported?</AccordionTrigger>
            <AccordionContent>
              <div className="text-muted-foreground space-y-2">
                <p>The website works on all modern browsers:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Chrome (recommended)</li>
                  <li>Firefox</li>
                  <li>Safari</li>
                  <li>Edge</li>
                  <li>Opera</li>
                </ul>
                <p className="mt-2">Mobile browsers are also supported.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Is there a mobile app?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Currently, there is no dedicated mobile app, but the website is mobile-responsive 
                and works well on smartphones and tablets.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DocSection>

      <DocSection id="coffee-tools" title="Coffee Tools Questions">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the SCA Flavour Wheel?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                The SCA (Specialty Coffee Association) Flavour Wheel is the industry standard for 
                describing coffee flavours and aromas. Our interactive version makes it easier to 
                explore and use during coffee tastings.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need to be a coffee professional to use the coffee tools?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                No! The tools are designed for both professionals and enthusiasts. Whether you're a 
                barista, roaster, or just love coffee, these tools can help improve your coffee experience.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I use the flavour wheel during cupping sessions?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Absolutely! That's one of the primary use cases. You can reference it on a laptop, 
                tablet, or phone during professional cupping sessions or casual tastings.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Will more coffee tools be added?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes, additional coffee tools are in development, including cupping sheets, brewing 
                calculators, and water recipe builders.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DocSection>

      <DocSection id="etf-tracker" title="ETF Tracker Questions">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How current is the ETF data?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Data is regularly updated, though there may be slight delays. Always check the timestamp 
                on the data and verify critical information with official sources before making financial decisions.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Can I track any ETF?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                The tracker includes many popular ETFs, but not all funds may be available. If you can't 
                find a specific ETF, try searching by ticker symbol or full name.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is this financial advice?</AccordionTrigger>
            <AccordionContent>
              <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                <CardContent className="pt-6">
                  <p className="text-amber-900 dark:text-amber-100">
                    <strong>No.</strong> The ETF Tracker is for informational purposes only and does not 
                    constitute financial advice. Always consult with a qualified financial advisor before 
                    making investment decisions.
                  </p>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I create a personal portfolio?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Portfolio management features may be added in future updates. Currently, you can browse 
                and track multiple ETFs simultaneously.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>What if the data seems incorrect?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Always verify important information with official sources. If you notice persistent data 
                issues, please report them through the contact form.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DocSection>

      <DocSection id="qr-generator" title="QR Code Generator Questions">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What types of QR codes can I create?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Currently, the tool specializes in WiFi QR codes, allowing you to share network 
                credentials easily. Additional QR code types may be added in the future.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it safe to create WiFi QR codes?</AccordionTrigger>
            <AccordionContent>
              <div className="text-muted-foreground space-y-2">
                <p>
                  Yes, the QR code generation happens in your browser. However, be mindful of where you 
                  share or post WiFi QR codes, as anyone who scans them can access your network.
                </p>
                <Card className="mt-3">
                  <CardContent className="pt-6">
                    <p className="text-sm font-semibold mb-2">Security Tips:</p>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>Use WPA/WPA2 encryption</li>
                      <li>Consider a separate guest network</li>
                      <li>Control where you display QR codes</li>
                      <li>Update passwords regularly</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I customize the QR code appearance?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Standard QR codes are generated currently. Customization options may be added in future updates.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Will the QR code work on all phones?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Most modern smartphones (iOS 11+ and Android 10+) can scan QR codes natively using the 
                camera app. Older devices may need a dedicated QR reader app.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I create QR codes for my business?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes! The WiFi QR code generator is perfect for businesses, offices, restaurants, hotels, 
                and any venue where you want to share network access easily.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DocSection>

      <DocSection id="technical" title="Technical Support">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I report a bug?</AccordionTrigger>
            <AccordionContent>
              <div className="text-muted-foreground space-y-2">
                <p>Use the contact form on the website to report any bugs or technical issues. Please include:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>What you were trying to do</li>
                  <li>What happened instead</li>
                  <li>Your browser and device information</li>
                  <li>Screenshots if applicable</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Can I suggest new features?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Absolutely! Feature suggestions are welcome. Use the contact form to share your ideas.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is the website accessible?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Efforts are made to ensure accessibility, but if you encounter any accessibility issues, 
                please report them so they can be addressed.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Why isn't a feature working?</AccordionTrigger>
            <AccordionContent>
              <div className="text-muted-foreground space-y-2">
                <p>First, try:</p>
                <ol className="list-decimal list-inside ml-4">
                  <li>Refreshing your browser</li>
                  <li>Clearing your browser cache</li>
                  <li>Trying a different browser</li>
                  <li>Checking your internet connection</li>
                </ol>
                <p className="mt-2">If problems persist, contact support through the website.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I use these tools for commercial purposes?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                The tools are provided for general use. For specific commercial licensing questions, 
                please contact through the website.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DocSection>

      <DocSection id="privacy" title="Privacy & Security">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What data do you collect?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                The website respects user privacy. For specific data collection and privacy practices, 
                refer to the privacy policy on the website.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Are QR codes stored on your servers?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                WiFi QR codes are typically generated client-side in your browser. No credentials are 
                stored on our servers.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is my browsing data tracked?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Standard web analytics may be used to improve the website. No personal financial or 
                sensitive data is collected through the tools.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How secure is the website?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                The website uses standard security practices. However, for sensitive financial decisions, 
                always verify information with official sources.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DocSection>

      <DocSection id="future" title="Future Development">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What new features are coming?</AccordionTrigger>
            <AccordionContent>
              <div className="text-muted-foreground space-y-2">
                <p>Upcoming features may include:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Additional coffee tools (cupping sheets, brewing calculators)</li>
                  <li>Enhanced ETF tracking capabilities</li>
                  <li>More QR code types</li>
                  <li>Digital wishlist functionality</li>
                  <li>Blog content about coffee and technology</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How often is the website updated?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                The website is regularly updated with improvements, bug fixes, and new features. 
                Check back often for updates!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I contribute ideas or code?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Feature suggestions are always welcome! For technical contributions, contact through 
                the website to discuss opportunities.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Will there be API access?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                API access is not currently available but may be considered for future development.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-2">Still Have Questions?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              If your question wasn't answered here:
            </p>
            <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
              <li>Check the specific tool documentation</li>
              <li>Use the contact form on the website</li>
              <li>Try the tool and explore its features</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-3">
              The website is designed to be intuitive, so feel free to experiment and discover what each tool can do!
            </p>
          </CardContent>
        </Card>
      </DocSection>
    </DocLayout>
  );
}
