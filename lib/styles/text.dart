import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';

TextStyle smallTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyColors.darkerGrey,
      fontWeight: fontWeight ?? FontWeight.normal,
      fontSize: fontSize ?? 14);
}

TextStyle normalTextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyColors.darkerGrey,
      fontWeight: fontWeight ?? FontWeight.normal,
      fontSize: fontSize ?? 16);
}

TextStyle h1TextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyColors.darkerGrey,
      fontWeight: fontWeight ?? FontWeight.w400,
      fontSize: fontSize ?? 24);
}

TextStyle h2TextStyle(
    {Color? color, FontWeight? fontWeight, double? fontSize}) {
  return TextStyle(
      fontFamily: 'Inter',
      color: color ?? LocallyColors.darkerGrey,
      fontWeight: fontWeight ?? FontWeight.normal,
      fontSize: fontSize ?? 20);
}
