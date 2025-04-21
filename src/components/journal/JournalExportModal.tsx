
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function JournalExportModal({ open, onOpenChange }: { open: boolean, onOpenChange: (v: boolean)=>void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Journal Entries</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="text-sm">Choose export format:</div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full">CSV</Button>
            <Button variant="outline" className="w-full">JSON</Button>
            <Button variant="outline" className="w-full">Excel</Button>
            <Button variant="outline" className="w-full">PDF (with branding)</Button>
            <Button variant="outline" className="w-full">Share Link (Coach/Accountability)</Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={()=>onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
