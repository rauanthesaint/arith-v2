// @/components/Sidebar/Sidebar.tsx
"use client";
// imports
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Fragment } from "react";
import styles from "./Sidebar.module.scss";
import { calculators, converters, general } from "./sidebar.data";
import Link from "next/link";
import { Calculator, MenuScale } from "iconoir-react/regular";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { useState } from "react";
import { Menu, NavArrowDown } from "iconoir-react";
import { Label, Paragraph } from "tracey-ui";
import ArithmeticCalculator from "../Airthmetic/Arithmetic";

import Logo from "@/public/static/img/logo.svg";
import Image from "next/image";
import Drawer from "@/dev/Drawer";
import { Converter } from "@/components";

type ConversionType =
  | "distance"
  | "weight"
  | "temperature"
  | "time"
  | "currency";

const unitsMap: Record<ConversionType, string[]> = {
  distance: [
    "KILOMETERS(km)",
    "METERS(m)",
    "CENTIMETERS(cm)",
    "MILLIMETERS(mm)",
    "MILES(mi)",
    "INCHES(in)",
    "Feet(ft)",
    "Yard(yd)",
  ],
  weight: [
    "KILOGRAMS(kg)",
    "GRAMS(g)",
    "MILLIGRAMS(mg)",
    "POUND(lb)",
    "OUNCE(oz)",
  ],
  temperature: ["Celsius", "Kelvin", "Fahrenheit"],
  time: ["SECONDS(s)", "MINUTES(min)", "HOURS(h)", "DAY", "WEEK"],
  currency: [
    "USD(American Dollar)",
    "KZT(Kazakhstani Tenge)",
    "EUR(Euro)",
    "RUB(Russian Rubles)",
    "YEN(Japanese Yens)",
    "CNY(Chinese Yuans)",
    "TRY(Turkish Liras)",
  ],
};

const Sidebar = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleVisibility = (value: boolean) => {
    setIsVisible(value);
  };
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  const path = usePathname();
  // Converter Types
  const [conversionType, setConversionType] =
    useState<ConversionType>("distance");
  const handleLinkClick = (type: ConversionType) => {
        setConversionType(type);    
        onOpen();
      };


  return (
    <Fragment>
      <ArithmeticCalculator visible={isVisible} onClose={handleVisibility} />
      <aside className={styles.sidebar}>
        {/* SIDEBAR HEADER */}
        <header>
          <button
            title="Toggle Menu Button"
            type="button"
            onClick={handleToggle}
            className={styles.sidebar__toggleButton}
          >
            <MenuScale />
          </button>
        </header>
        {/* SIDEBAR CONTENT */}
        <section className={styles.content}>
          {calculators.map((elem, index) => {
            return (
              <Link
                key={index}
                href={elem.link}
                title={`${elem.title} Calculator`}
                className={clsx(
                  styles.item,
                  path === elem.link && styles.active
                )}
              >
                {elem.icon}
                <span>{elem.title}</span>
              </Link>
            );
          })}
          <button
            type="button"
            title="Arithmetic Calcucaltor"
            onClick={() => handleVisibility(!isVisible)}
            className={styles.item}
          >
            <Calculator />
            <span>Arithmetic</span>
          </button>
        </section>
      </aside>

      <Drawer zIndex={10} align="left" open={isActive} onClose={handleToggle}>
        <section className={clsx(styles.drawer, isActive && styles.active)}>
          <header>
            <button
              title="Menu Toggle Button"
              type="button"
              className={styles.sidebar__toggleButton}
              onClick={handleToggle}
            >
              <Menu />
            </button>
          </header>
          <section className={styles.content}>
            <Label size="sm" type="secondary">
              Calculators
            </Label>
            <div>
              {calculators.map((elem, index) => {
                return (
                  <Link
                    key={index}
                    href={elem.link}
                    className={clsx(
                      styles.item,
                      path === elem.link && styles.active
                    )}
                    onClick={handleToggle}
                  >
                    {elem.icon}
                    <Label>{elem.title}</Label>
                  </Link>
                );
              })}
            </div>
            <hr />
            <Label size="sm" type="secondary">
              Converters
            </Label>
            <div
              className={clsx(styles.expandable, isExpanded && styles.active)}
            >
              {converters.map((elem, index) => {
                return (
                  <Link
                    key={index}
                    href={elem.link}
                    className={styles.item}
                    onClick={() => handleLinkClick(elem.type)}
                  >
                    {elem.icon}
                    <Label>{elem.title}</Label>
                  </Link>
                );
              })}
              <button
                className={clsx(styles.item, styles.expandButton)}
                title="Expand"
                type="button"
                onClick={handleClick}
              >
                <NavArrowDown />
                <Label>{isExpanded ? "Collapse" : "Expand"}</Label>
              </button>
            </div>
            <hr />
            <div className={styles.secondary}>
              {general.map((elem, index) => {
                return (
                  <Link key={index} href={elem.link} className={styles.item}>
                    {elem.icon}
                    <Label type="secondary">{elem.title}</Label>
                  </Link>
                );
              })}
            </div>
            <hr />
            <Paragraph size="xs" type="secondary">
              &copy; 2024 TraceyDevLab
            </Paragraph>
          </section>
        </section>
      </Drawer>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="z-[1001]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {conversionType}
              </ModalHeader>
              <ModalBody>
                {unitsMap[conversionType] && (
                  <Converter
                    conversionType={
                      conversionType === "distance"
                        ? "length"
                        : conversionType === "weight"
                        ? "weight"
                        : conversionType === "time"
                        ? "time"
                        : conversionType === "temperature"
                        ? "temperature"
                        : "currency"
                    }
                    units={unitsMap[conversionType]}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default Sidebar;
