'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label = '복사' }: CopyButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(text)}
            disabled={!text}
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                복사됨
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                {label}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCopied ? '클립보드에 복사했습니다.' : '클립보드에 복사'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
