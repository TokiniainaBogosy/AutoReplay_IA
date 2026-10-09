// frontend/src/components/StatusBadge.jsx
const STATUS_STYLES = {
  nouveau:  { color: '#5e6ad2', label: 'Nouveau' },
  repondu:  { color: '#f2c94c', label: 'Répondu' },
  converti: { color: '#4cb782', label: 'Converti' },
  archive:  { color: '#62666d', label: 'Archivé' },
}

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.nouveau

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8a8f98]">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: style.color }}
      />
      {style.label}
    </span>
  )
}