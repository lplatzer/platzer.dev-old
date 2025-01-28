

export const navigation = {
    pages: [
        {
            name: 'Home',
            href: '/',
            activeSegment: '/'
        },
        {
            name: 'Contact',
            href: '/contact',
            activeSegment: '/contact'
        },
    ],
    coffeeTools: [
        {
            name: 'Interactive Coffee Flavour Wheel',
            href: '/coffee-tools/flavour-wheel',
            activeSegment: '/coffee-tools/flavour-wheel',
            parentNav: 'tools',
            description: 'SCA Arabica Flavour Wheel'
        },
        {
            name: 'SCA Cupping Sheet',
            href: '/coffee-tools/cupping-tool',
            activeSegment: '/coffee-tools/cupping-tool',
            parentNav: 'tools',
            description: 'based on the new SCA Cupping Sheet'
        },
    ],
    tools: [
        {
            name: 'QR Code Generator',
            href: '/tools/qr-code-generator',
            activeSegment: '/tools/qr-code-generator',
            parentNav: 'tools',
            description: 'Generates different types of QR Codes'
        },
        {
            name: 'Digital Wishlist',
            href: '/tools/digital-wishlist',
            activeSegment: '/tools/digital-wishlist',
            parentNav: 'tools',
            description: 'Wishlist to share to family & friends'

        }
]
}