import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';

TextStyle primaryButtonTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.white,
      fontWeight: fontWeight ?? FontWeight.w500,
      fontSize: fontSize ?? 16);
}

TextStyle secondaryButtonTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.primary,
      fontWeight: fontWeight ?? FontWeight.w500,
      fontSize: fontSize ?? 16);
}

TextStyle textButtonTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.primary,
      fontWeight: fontWeight ?? FontWeight.w500,
      fontSize: fontSize ?? 16);
}

TextStyle smallTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.smallText,
      fontWeight: fontWeight ?? FontWeight.w400,
      fontSize: fontSize ?? 14);
}

TextStyle captionTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.captionText,
      fontWeight: fontWeight ?? FontWeight.w400,
      fontSize: fontSize ?? 14);
}

TextStyle inputErrorTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.errorText,
      fontWeight: fontWeight ?? FontWeight.w400,
      fontSize: fontSize ?? 14);
}

TextStyle normalTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.normalText,
      fontWeight: fontWeight ?? FontWeight.w400,
      fontSize: fontSize ?? 16);
}

TextStyle linkTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.linkText,
      fontWeight: fontWeight ?? FontWeight.w400,
      fontSize: fontSize ?? 16);
}

TextStyle h1TextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.h1Text,
      fontWeight: fontWeight ?? FontWeight.w500,
      fontSize: fontSize ?? 24);
}

TextStyle h2TextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyLightColors.h2Text,
      fontWeight: fontWeight ?? FontWeight.w500,
      fontSize: fontSize ?? 20);
}
