"use client";

import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { ArrowUpRight } from "@/components/icons";
import {
  primaryNav,
  STUDIO_EMAIL,
} from "@/lib/site";

export function SiteHeader() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const handleClose = () => {
      setIsOpen(false);
      document.documentElement.classList.remove("menu-open");
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
      document.documentElement.classList.remove("menu-open");
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => {
      if (desktop.matches && dialogRef.current?.open) {
        dialogRef.current.close();
      }
    };

    desktop.addEventListener("change", handleChange);

    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();
    setIsOpen(true);
    document.documentElement.classList.add("menu-open");
  };

  const closeMenu = () => {
    dialogRef.current?.close();
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <BrandMark />

        <nav aria-label="Primary" className="primary-nav">
          <ul className="primary-nav__list">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a className="primary-nav__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a className="nav-pill" href="#contact">
                <span>Let&rsquo;s Talk</span>
                <ArrowUpRight className="nav-pill__icon" />
              </a>
            </li>
          </ul>
        </nav>

        <button
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="menu-toggle"
          onClick={openMenu}
          type="button"
        >
          <span aria-hidden="true" className="menu-toggle__bars">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <dialog
        aria-label="Site navigation"
        className="mobile-menu"
        id="mobile-menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
        ref={dialogRef}
      >
        <div className="mobile-menu__inner">
          <div className="mobile-menu__bar">
            <BrandMark onNavigate={closeMenu} />
            <button
              aria-label="Close menu"
              className="menu-close"
              onClick={closeMenu}
              type="button"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile primary" className="mobile-nav">
            <ul className="mobile-nav__list">
              {primaryNav.map((item, index) => (
                <li key={item.href}>
                  <a
                    className="mobile-nav__link"
                    href={item.href}
                    onClick={closeMenu}
                  >
                    <span aria-hidden="true" className="mobile-nav__index">
                      0{index + 1}
                    </span>
                    <span>{item.label}</span>
                    <ArrowUpRight className="mobile-nav__icon" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__foot">
            <a className="button button--primary" href="#contact">
              <span>Start a Project</span>
              <ArrowUpRight className="button__icon" />
            </a>
            <p className="mobile-menu__note">
              Independent software &amp; AI studio
              <span aria-hidden="true"> · </span>
              <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
            </p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
