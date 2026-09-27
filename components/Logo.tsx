export default function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="brand"><span className="brandMark">A</span>{!compact && <span><b>AffiOne</b><small>Affiliate Store Builder</small></span>}</div>
}
