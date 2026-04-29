"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const EcommerceProof = () => {
    const proofRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!proofRef.current) return;
        const ctx = gsap.context(() => {
            const card = proofRef.current!.querySelector('.proof-card');
            const btn = proofRef.current!.querySelector('.proof-btn');
            const img = proofRef.current!.querySelector('.proof-img');
            const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });
            tl.to(card, { y: -10, duration: 1.5, ease: 'power1.inOut' })
              .to(btn, { backgroundColor: 'hsl(var(--muted-foreground))', duration: 1.5, ease: 'power1.inOut' }, '<')
              .to(img, { scale: 1.05, duration: 1.5, ease: 'power1.inOut' }, '<');
        }, proofRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={proofRef} className="w-full h-full flex items-center justify-center bg-black/20 p-8">
            <div className="relative w-48 h-64 bg-secondary rounded-sm p-4 proof-card">
                <div className="w-full h-24 bg-primary rounded-sm mb-2 proof-img"></div>
                <div className="h-4 w-3/4 bg-primary rounded-full mb-1"></div>
                <div className="h-3 w-1/2 bg-primary rounded-full"></div>
                <button className="absolute bottom-4 left-4 right-4 h-8 bg-accent text-accent-foreground text-xs rounded-full proof-btn">Add to Bag</button>
            </div>
        </div>
    );
};

export default EcommerceProof;
