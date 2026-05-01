import React from 'react';

function FormattedText({ content }: { content: string }) {
  // Convert markdown to clean formatted output
  const lines = content.split('\n')

  return (
    <div>
      {lines.map((line, i) => {
        // Bold: **text** → <strong>
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

        // Bullet points: lines starting with * or -
        if (line.match(/^\s*[\*\-]\s/)) {
          return (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
              <span style={{ color: '#FF9933', flexShrink: 0 }}>•</span>
              <span dangerouslySetInnerHTML={{
                __html: line.replace(/^\s*[\*\-]\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            </div>
          )
        }

        // Heading lines (bold standalone line)
        if (line.match(/^\*\*.*\*\*$/)) {
          return (
            <div key={i} style={{ fontWeight: 600, marginBottom: 6, marginTop: i > 0 ? 10 : 0 }}
              dangerouslySetInnerHTML={{ __html: formatted }} />
          )
        }

        // Skip empty lines but add spacing
        if (!line.trim()) return <div key={i} style={{ height: 6 }} />

        // Normal line
        return (
          <div key={i} style={{ marginBottom: 4 }}
            dangerouslySetInnerHTML={{ __html: formatted }} />
        )
      })}
    </div>
  )
}

export function MessageBubble({ role, content }: { role: string; content: string }) {
  const isUser = role === 'user'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 16,
    }}>
      {/* AI avatar */}
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#FF9933', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          marginRight: 10, flexShrink: 0, fontSize: 14,
        }}>
          🗳️
        </div>
      )}

      <div style={{
        maxWidth: '70%',
        background: isUser ? '#FF9933' : 'white',
        color: isUser ? 'white' : '#000080',
        padding: '12px 16px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        border: isUser ? 'none' : '1px solid #D4C4A0',
        fontSize: 14,
        lineHeight: 1.6,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}>
        <FormattedText content={content} />
      </div>
    </div>
  )
}
