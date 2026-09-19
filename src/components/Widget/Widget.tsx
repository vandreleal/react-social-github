import type { ReactNode } from 'react'
import './Widget.css'

export interface WidgetProps {
  children?: ReactNode
}

/**
 * Block-level shell for `type="widget"` — the card is rendered inline in
 * the document rather than in a popup.
 */
export function Widget({ children }: WidgetProps) {
  return <div className="rsg-github-widget">{children}</div>
}
