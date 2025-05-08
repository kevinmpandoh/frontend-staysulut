// components/LoginModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLoginModal } from "@/stores/loginModal.store";
import { Button } from "@/components/ui/button";

const LoginModal = () => {
  const { isOpen, close } = useLoginModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Diperlukan</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 mb-4">
          Kamu perlu login terlebih dahulu untuk menambahkan ke wishlist.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={close}>
            Tutup
          </Button>
          <Button
            onClick={() => {
              // Misalnya redirect ke halaman login
              window.location.href = "/login";
            }}
          >
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
