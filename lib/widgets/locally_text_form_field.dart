import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';

class LocallyTextFormField extends StatefulWidget {
  final String? name;
  final String? helperText;
  final double? width;
  final TextEditingController? controller;
  final String? Function(String?)? validator;

  const LocallyTextFormField(
      {Key? key,
      this.name,
      this.helperText,
      this.controller,
      this.validator,
      this.width})
      : super(key: key);

  @override
  State<LocallyTextFormField> createState() => _LocallyTextFormFieldState();
}

class _LocallyTextFormFieldState extends State<LocallyTextFormField> {
  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      if (widget.name != null)
        Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: Text(widget.name!, style: normalTextStyle())),
      if (widget.width != null)
        SizedBox(
            width: widget.width,
            child: TextFormField(
              controller: widget.controller,
              validator: widget.validator,
            )),
      if (widget.width == null)
        TextFormField(
          controller: widget.controller,
          validator: widget.validator,
        ),
      if (widget.helperText != null)
        Padding(
            padding: const EdgeInsets.only(top: 10),
            child: Text(widget.helperText!, style: smallTextStyle())),
    ]);
  }
}
