import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`
  ).then((r) => r.text())
  const fontUrl = css.match(/src: url\((.+?)\)/)?.[1]
  if (!fontUrl) throw new Error(`Failed to extract font URL for: ${family}`)
  return fetch(fontUrl).then((r) => r.arrayBuffer())
}

export default async function Image() {
  const [playfairData, dmSansData] = await Promise.all([
    loadGoogleFont('Playfair Display', 700),
    loadGoogleFont('DM Sans', 400),
  ])

  const logoSvg = readFileSync(join(process.cwd(), 'public/logo.svg'))
  const logoSrc = `data:image/svg+xml;base64,${logoSvg.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#1A0E06',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top-right sienna glow */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -150,
            width: 900,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(201,131,42,0.32) 0%, rgba(201,131,42,0.06) 45%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Bottom-left bark glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: -120,
            width: 750,
            height: 550,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(92,61,30,0.45) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Subtle top-left accent */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(139,94,60,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Horizontal hairline top */}
        <div
          style={{
            position: 'absolute',
            top: 56,
            left: 64,
            right: 64,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(201,131,42,0.35) 30%, rgba(201,131,42,0.35) 70%, transparent)',
            display: 'flex',
          }}
        />

        {/* Horizontal hairline bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            left: 64,
            right: 64,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(201,131,42,0.35) 30%, rgba(201,131,42,0.35) 70%, transparent)',
            display: 'flex',
          }}
        />

        {/* Center content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0px',
          }}
        >
          {/* Logo badge */}
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: '28px',
              background:
                'linear-gradient(145deg, rgba(201,131,42,0.20) 0%, rgba(92,61,30,0.14) 100%)',
              border: '1.5px solid rgba(201,131,42,0.42)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '36px',
            }}
          >
            <img src={logoSrc} width={130} height={130} />
          </div>

          {/* App name */}
          <div
            style={{
              fontFamily: '"Playfair Display"',
              fontWeight: 700,
              fontSize: '108px',
              color: '#F5ECD7',
              letterSpacing: '-4px',
              lineHeight: 1,
              marginBottom: '28px',
            }}
          >
            Contiq
          </div>

          {/* Cognac accent line */}
          <div
            style={{
              width: '68px',
              height: '2px',
              background:
                'linear-gradient(90deg, rgba(201,131,42,0.4), #C9832A, rgba(201,131,42,0.4))',
              borderRadius: '1px',
              marginBottom: '28px',
              display: 'flex',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontFamily: '"DM Sans"',
              fontWeight: 400,
              fontSize: '22px',
              color: '#A0856A',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            AI-powered document intelligence
          </div>
        </div>

        {/* Bottom-right URL badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '56px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#C9832A',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontFamily: '"DM Sans"',
              fontSize: '15px',
              color: 'rgba(160,133,106,0.5)',
              letterSpacing: '0.07em',
            }}
          >
            contiq.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Playfair Display',
          data: playfairData,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'DM Sans',
          data: dmSansData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  )
}
