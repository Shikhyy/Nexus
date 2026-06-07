'use client';
export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 h-full max-w-4xl mx-auto w-full">
      <header className="mb-4">
        <h1 className="text-3xl font-serif text-[var(--color-obsidian)] tracking-tight">System Settings</h1>
        <p className="text-[var(--color-secondary)] mt-1">Configure your NEXUS integrations and Agent thresholds.</p>
      </header>

      <div className="bg-[var(--color-linen)] border-[0.5px] border-[var(--color-border)] rounded-lg p-8 shadow-sm">
        <h2 className="text-lg font-medium text-[var(--color-primary)] mb-6 border-b-[0.5px] border-[var(--color-border)] pb-2">Integrations</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-primary)]">Microsoft 365 Graph API</p>
              <p className="text-sm text-[var(--color-secondary)]">Required for Capability Modeller inferences.</p>
            </div>
            <button className="px-4 py-2 bg-[var(--color-forest-surface)] text-[var(--color-forest)] text-sm font-medium rounded-md border-[0.5px] border-[var(--color-forest)]">
              Connected
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-primary)]">Azure DevOps / GitHub</p>
              <p className="text-sm text-[var(--color-secondary)]">Source code capability parsing.</p>
            </div>
            <button className="px-4 py-2 bg-[var(--color-stone)] text-[var(--color-primary)] text-sm font-medium rounded-md border-[0.5px] border-[var(--color-border)] hover:bg-[var(--color-parchment)]">
              Connect
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-[var(--color-linen)] border-[0.5px] border-[var(--color-border)] rounded-lg p-8 shadow-sm">
        <h2 className="text-lg font-medium text-[var(--color-primary)] mb-6 border-b-[0.5px] border-[var(--color-border)] pb-2">Agent Thresholds</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-[var(--color-primary)]">Action Planner Autonomy</label>
            <p className="text-sm text-[var(--color-secondary)] mb-2">Determine when Gemini can execute actions without approval.</p>
            <select className="p-2 border-[0.5px] border-[var(--color-border)] rounded-md bg-[var(--color-parchment)] text-[var(--color-primary)] outline-none focus:border-[var(--color-prussian)]">
              <option>Require Approval for All Actions</option>
              <option>Auto-Approve Low Impact Actions</option>
              <option>Auto-Approve Low & Medium Impact Actions</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
