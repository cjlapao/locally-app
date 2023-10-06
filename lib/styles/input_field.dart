import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/styles/text.dart';

InputDecorationTheme inputTheme() {
  return InputDecorationTheme(
      filled: true,
      fillColor: LocallyLightColors.white,
      contentPadding: const EdgeInsets.symmetric(
        vertical: 12.0,
        horizontal: 10.0,
      ),
      constraints: const BoxConstraints(maxHeight: 38),
      errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(7.0),
          borderSide: const BorderSide(
              color: LocallyLightColors.inputBorderError,
              style: BorderStyle.solid,
              width: 2.0)),
      disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(7.0),
          borderSide: const BorderSide(
              color: LocallyLightColors.inputBorderDisabled,
              style: BorderStyle.solid,
              width: 2.0)),
      enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(7.0),
          borderSide: const BorderSide(
              color: LocallyLightColors.inputBorder,
              style: BorderStyle.solid,
              width: 2.0)),
      focusedBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(7.0)),
          borderSide: BorderSide(
              color: LocallyLightColors.inputBorderFocused,
              width: 2,
              style: BorderStyle.solid)),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(7.0),
        borderSide: const BorderSide(
            color: LocallyLightColors.inputBorder,
            style: BorderStyle.solid,
            width: 5.0),
      ),
      floatingLabelStyle: normalTextStyle(),
      hintStyle: captionTextStyle(),
      errorStyle: inputErrorTextStyle());
}
