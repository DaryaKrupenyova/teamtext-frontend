import React from "react";

interface FileIconProps {
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ className = "" }) => {
  return (
    <svg className={className} viewBox="0 0 130 170" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 19.8331V167.166C0 168.731 1.26536 170 2.8264 170H110.218C111.778 170 113.043 168.731 113.043 167.166V48.1672C113.043 48.1042 113.013 48.0505 113.007 47.9886C112.993 47.7401 112.944 47.495 112.863 47.2604C112.831 47.1694 112.809 47.0818 112.769 46.9931C112.632 46.685 112.441 46.4038 112.204 46.1633L83.9433 17.8304C83.7034 17.5911 83.4217 17.3997 83.1121 17.2632C83.0271 17.227 82.941 17.1967 82.8525 17.1698C82.6162 17.0881 82.3706 17.0391 82.1203 17.0228C82.0726 17.031 82.0167 17.0006 81.9573 17.0006H2.8264C1.26536 17.0006 0 18.268 0 19.8331ZM103.395 45.3336H84.7826V26.6733L103.395 45.3336ZM5.65163 22.6667H79.1309V48.1672C79.1309 49.7311 80.3963 50.9997 81.9562 50.9997H107.391V164.334H5.65163V22.6667Z" />
      <path d="M118.696 147.333V152.999H127.174C128.735 152.999 130 151.732 130 150.167V2.83364C130 1.2686 128.735 0 127.174 0H19.7822C18.2212 0 16.9558 1.2686 16.9558 2.83364V11.3334H22.6086V5.66612H124.347V147.333H118.696Z" />
      <path d="M22.6086 56.6671H90.434V62.3332H22.6086V56.6671Z" />
      <path d="M22.6086 39.6661H45.2175V45.3334H22.6086V39.6661Z" />
      <path d="M22.6086 73.6667H67.8263V79.334H22.6086V73.6667Z" />
      <path d="M73.4783 73.6667H90.4343V79.334H73.4783V73.6667Z" />
      <path d="M22.6086 90.666H90.434V96.3333H22.6086V90.666Z" />
      <path d="M22.6086 124.666H90.434V130.334H22.6086V124.666Z" />
      <path d="M48.043 107.667H90.4342V113.333H48.043V107.667Z" />
      <path d="M22.6086 107.667H42.3911V113.333H22.6086V107.667Z" />
      <path d="M22.6086 141.667H33.9131V147.333H22.6086V141.667Z" />
      <path d="M39.5645 141.667H90.4337V147.333H39.5645V141.667Z" />
    </svg>
  );
};