"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ApiGatewayProof = () => {
    const proofRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!proofRef.current) return;
        const ctx = gsap.context(() => {
            const lines = proofRef.current!.querySelectorAll('.code-line');
            gsap.from(lines, {
                x: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 1.5,
                ease: 'power2.out',
                repeat: -1,
                repeatDelay: 2
            });
        }, proofRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={proofRef} className="w-full h-full flex items-center justify-center p-4">
            <div className="font-mono text-xs text-green-400/70 space-y-1">
                <p className="code-line">&gt; REQ: GET /users/123</p>
                <p className="code-line">&gt; AUTH: Validating JWT...</p>
                <p className="code-line">&gt; ROUTE: -&gt; user-service:GetUser</p>
                <p className="code-line">&gt; RESP: 200 OK (21ms)</p>
                <p className="code-line">&gt; REQ: POST /orders</p>
                <p className="code-line">&gt; AUTH: Validating JWT...</p>
                <p className="code-line">&gt; ROUTE: -&gt; order-service:CreateOrder</p>
                <p className="code-line">&gt; RESP: 201 Created (45ms)</p>
            </div>
        </div>
    );
};

export default ApiGatewayProof;
